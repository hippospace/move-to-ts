use crate::ast_to_ts::is_type_signer;
use crate::shared::*;
use crate::utils::{capitalize, rename};
use itertools::Itertools;
use move_compiler::diagnostics::{Diagnostic, Diagnostics};
use move_compiler::expansion::ast::ModuleIdent;
use move_compiler::hlir::ast::{
    BaseType, BaseType_, FunctionSignature, SingleType, SingleType_, StructDefinition, TypeName_,
};
use move_compiler::naming::ast::BuiltinTypeName_;
use move_compiler::parser::ast::{Ability_, StructName};
use move_compiler::shared::Name;
use move_ir_types::location::Loc;
use std::collections::BTreeSet;
use std::fmt;

pub fn check_allowed_structs_for_entry_function(
    name: &String,
    mi: &ModuleIdent,
    sname: &StructName,
    loc: Loc,
) -> TermResult {
    let address = format_address_hex(mi.value.address);

    let short_name = format!("{}::{}::{}", address, mi.value.module, sname);

    if short_name == "0x1::string::String" {
        Ok(format!(
            "new ActualStringClass({{bytes: strToU8({})}}, parseTypeTagOrThrow('0x1::string::String'))",
            name
        ))
    } else {
        derr!((
            loc,
            "This struct type cannot be used at entry function invocation"
        ))
    }
}

pub fn vector_type_ts_parser(name: &String, element_type: &BaseType) -> TermResult {
    match &element_type.value {
        BaseType_::Param(_tparam) => {
            // FIXME
            derr!((
                element_type.loc,
                "Generic-typed arguments not supported at entry function invocation (yet)"
            ))
        }
        BaseType_::Apply(_, typename, _) => match &typename.value {
            TypeName_::ModuleType(mi, sname) => {
                check_allowed_structs_for_entry_function(name, mi, sname, element_type.loc)
            }
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::U8 => Ok(format!("strToU8({})", name)),
                _ => derr!((
                    element_type.loc,
                    "byte-strings is the only vector type supported at entry function invocation"
                )),
            },
        },
        _ => unreachable!(),
    }
}

pub fn stype_to_ts_parser(name: &String, loc: Loc, stype: &SingleType) -> TermResult {
    let base = match &stype.value {
        SingleType_::Base(b) => b,
        SingleType_::Ref(_, b) => b,
    };
    match &base.value {
        BaseType_::Param(_tparam) => {
            // FIXME
            derr!((
                loc,
                "Generic-typed arguments not supported at entry function invocation (yet)"
            ))
        }
        BaseType_::Apply(_, typename, targs) => match &typename.value {
            TypeName_::ModuleType(mi, sname) => {
                check_allowed_structs_for_entry_function(name, mi, sname, stype.loc)
            }
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::U8 => Ok(format!("u8({})", name)),
                BuiltinTypeName_::U16 => Ok(format!("u16({})", name)),
                BuiltinTypeName_::U32 => Ok(format!("u32({})", name)),
                BuiltinTypeName_::U64 => Ok(format!("u64({})", name)),
                BuiltinTypeName_::U128 => Ok(format!("u128({})", name)),
                BuiltinTypeName_::U256 => Ok(format!("u256({})", name)),
                BuiltinTypeName_::Bool => Ok(format!("{}=='true'", name)),
                BuiltinTypeName_::Address => Ok(format!("new HexString({})", name)),
                BuiltinTypeName_::Signer => unreachable!(),
                BuiltinTypeName_::Vector => {
                    assert!(targs.len() == 1);
                    vector_type_ts_parser(name, &targs[0])
                },
                BuiltinTypeName_::Fun => Ok(format!("{}", name))
            },
        },
        _ => unreachable!(),
    }
}

pub fn format_qualified_payload_fname_and_import(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
) -> (String, String) {
    // name exists in a different package, use fully qualified name
    let package_name = format_address(mident.value.address);
    (
        format!(
            "{}.{}.buildPayload_{}",
            capitalize(&package_name),
            capitalize(&mident.value.module),
            name
        ),
        package_name,
    )
}

pub fn format_qualified_fname_and_import(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
) -> (String, String) {
    // name exists in a different package, use fully qualified name
    let package_name = format_address(mident.value.address);
    (
        format!(
            "{}.{}.query_{}",
            capitalize(&package_name),
            capitalize(&mident.value.module),
            name
        ),
        package_name,
    )
}

/// Generates module_name:func-name command for entry functions marked with #[cmd]
pub fn generate_command(cmd: &CmdParams) -> Result<(String, String), Diagnostic> {
    let type_param_names = cmd
        .func
        .signature
        .type_parameters
        .iter()
        .map(|tparam| tparam.user_specified_name.to_string())
        .collect::<Vec<_>>();
    let param_no_signers = cmd
        .func
        .signature
        .parameters
        .iter()
        .filter(|(_, stype)| !is_type_signer(stype));
    let param_names_no_signer = param_no_signers
        .clone()
        .map(|(name, _)| name.to_string())
        .collect::<Vec<_>>();
    let mut all_params = vec![];
    all_params.extend(type_param_names.clone());
    all_params.extend(param_names_no_signer.clone());

    let mut arg_decls = vec![];
    for pname in all_params.iter() {
        arg_decls.push(format!("{}: string", pname));
    }
    arg_decls.push(format!("{}", "max_gas: string"));

    let mut param_parsers = vec![];
    let mut arguments = vec![];
    for tparam in cmd.func.signature.type_parameters.iter() {
        let tname = tparam.user_specified_name;
        param_parsers.push(format!(
            "  const {}_ = parseTypeTagOrThrow({});",
            tname, tname
        ));
        arguments.push(format!("  .argument('<TYPE_{}>')", tname));
    }
    for (pname, ptype) in param_no_signers {
        param_parsers.push(format!(
            "  const {}_ = {};",
            pname,
            stype_to_ts_parser(&pname.to_string(), pname.0.loc, ptype)?
        ));
        arguments.push(format!("  .argument('<{}>')", pname));
    }
    arguments.push(format!("  .argument('[max_gas]', '', '10000')"));
    param_parsers.push(format!("  const max_gas_ = parseInt(max_gas);"));
    let (payload_builder, package_name) =
        format_qualified_payload_fname_and_import(&cmd.mi, &cmd.fname);
    let payload = format!(
        "{}({}{})",
        payload_builder,
        param_names_no_signer
            .iter()
            .map(|pname| format!("{}_", pname))
            .join(", "),
        if cmd.func.signature.type_parameters.is_empty() {
            "".to_string()
        } else {
            format!(
                "{}[{}]",
                if !param_names_no_signer.is_empty() {
                    ", "
                } else {
                    ""
                },
                type_param_names
                    .iter()
                    .map(|name| format!("{}_", name))
                    .join(", ")
            )
        }
    );
    let miname = cmd.mi.value.module;
    let func_name = format!("{}_{}", miname, cmd.fname);
    let command_name = format!(
        "{}:{}",
        miname.to_string().replace('_', "-"),
        cmd.fname.to_string().replace('_', "-")
    );
    let description = cmd.desc.clone().unwrap_or_default();
    let action_body = format!(
        r###"
const {} = async ({}) => {{
  const {{client, account}} = readConfig(program);
{}
  const payload = {};
  await sendPayloadTxAndLog(client, account, payload,{{maxGasAmount: max_gas_}});
}}

program
  .command("{}")
  .description("{}")
{}
  .action({});
"###,
        func_name,
        arg_decls.join(","),
        param_parsers.join("\n"),
        payload,
        command_name,
        description,
        arguments.join("\n"),
        func_name,
    );

    Ok((action_body, package_name))
}

pub fn format_qualified_sname_and_import(
    mident: &ModuleIdent,
    name: &StructName,
) -> (String, String) {
    // name exists in a different package, use fully qualified name
    let package_name = format_address(mident.value.address);
    (
        format!(
            "{}.{}.{}",
            capitalize(&package_name),
            capitalize(&mident.value.module),
            rename(name)
        ),
        package_name,
    )
}

/// Generate printer commands for functions included by #[method(...)]
pub fn generate_printer(
    mi: &ModuleIdent,
    sname: &StructName,
    sdef: &StructDefinition,
    fname: &Name,
    fsig: &FunctionSignature,
) -> Result<(String, String), Diagnostic> {
    let mut arg_decls = vec![];
    for tp in sdef.type_parameters.iter() {
        arg_decls.push(format!("{}: string", tp.param.user_specified_name));
    }
    for (name, _) in fsig.parameters[1..].iter() {
        arg_decls.push(format!("{}: string", name));
    }

    let (struct_qualified_name, package_name) = format_qualified_sname_and_import(mi, sname);

    let type_tags_inner = sdef
        .type_parameters
        .iter()
        .map(|tp| format!("parseTypeTagOrThrow({})", tp.param.user_specified_name))
        .join(", ");

    let mut arguments = vec![];

    for tp in sdef.type_parameters.iter() {
        arguments.push(format!(
            "  .argument('<TYPE_{}>')",
            tp.param.user_specified_name
        ));
    }
    for (name, _) in fsig.parameters[1..].iter() {
        arguments.push(format!("  .argument('<{}>')", name));
    }

    let mut param_handlers = vec![];
    for (name, ty) in fsig.parameters[1..].iter() {
        param_handlers.push(stype_to_ts_parser(&name.to_string(), name.0.loc, ty)?);
    }

    let cmd_func_name = format!("{}_{}", sname, fname);
    let command_name = format!("{}:{}", sname, fname.to_string().replace('_', "-"));

    let body = format!(
        r###"
const {} = async (owner: string, {}) => {{
  const {{client}} = readConfig(program);
  const repo = getProjectRepo();
  const owner_ = new HexString(owner);
  const value = await {}.load(repo, client, owner_, [{}])
  print(value.{}({}));
}}

program
  .command("{}")
  .argument("<ADDRESS:owner>")
{}
  .action({})
"###,
        cmd_func_name,
        arg_decls.join(", "),
        struct_qualified_name,
        type_tags_inner,
        fname,
        param_handlers.join(", "),
        command_name,
        arguments.join("\n"),
        cmd_func_name,
    );

    Ok((body, package_name))
}

/// Generate query commands for functions marked with #[query]
pub fn generate_query_printer(query: &CmdParams) -> Result<(String, String), Diagnostic> {
    let mut arg_decls = vec![];
    for tp in query.func.signature.type_parameters.iter() {
        arg_decls.push(format!("{}: string", tp.user_specified_name));
    }

    let params_no_signer = query
        .func
        .signature
        .parameters
        .iter()
        .filter(|(_, t)| !is_type_signer(t));
    for (name, _) in params_no_signer.clone() {
        arg_decls.push(format!("{}: string", name));
    }
    arg_decls.push(format!("{}", "max_gas: string"));

    let (query_func_name, package_name) =
        format_qualified_fname_and_import(&query.mi, &query.fname);

    let type_tags_inner = query
        .func
        .signature
        .type_parameters
        .iter()
        .map(|tp| format!("parseTypeTagOrThrow({})", tp.user_specified_name))
        .join(", ");

    let mut arguments = vec![];

    for tp in query.func.signature.type_parameters.iter() {
        arguments.push(format!("  .argument('<TYPE_{}>')", tp.user_specified_name));
    }
    for (name, _) in params_no_signer.clone() {
        arguments.push(format!("  .argument('<{}>')", name));
    }
    arguments.push(format!("  .argument('[max_gas]', '', '10000')"));

    let mut param_handlers = vec![];
    for (name, ty) in params_no_signer {
        param_handlers.push(stype_to_ts_parser(&name.to_string(), name.0.loc, ty)?);
    }

    let cmd_func_name = format!("{}_{}", query.mi.value.module, query.fname);
    let command_name = format!(
        "{}:query-{}",
        query.mi.value.module.to_string().replace('_', "-"),
        query.fname.to_string().replace('_', "-")
    );

    let body = format!(
        r###"
const {} = async ({}) => {{
  const {{client, account}} = readConfig(program);
  const repo = getProjectRepo();
  const value = await {}(client, getSimulationKeys(account), repo, {}{}[{}], {{maxGasAmount: parseInt(max_gas)}})
  print(value);
}}

program
  .command("{}")
{}
  .action({})
"###,
        cmd_func_name,
        arg_decls.join(", "),
        query_func_name,
        param_handlers.join(", "),
        if param_handlers.is_empty() { "" } else { ", " },
        type_tags_inner,
        command_name,
        arguments.join("\n"),
        cmd_func_name,
    );

    Ok((body, package_name))
}

pub fn generate_iter_table_printer(
    mi: &ModuleIdent,
    sname: &StructName,
    sdef: &StructDefinition,
    field_name: &Name,
) -> (String, String) {
    let action_name = format!("show_entries_{}_{}", sname, field_name);

    let type_param_decls = sdef
        .type_parameters
        .iter()
        .map(|tparam| format!("{}: string", tparam.param.user_specified_name))
        .join(", ");

    let (struct_qualified_name, package_name) = format_qualified_sname_and_import(mi, sname);

    let type_tags_inner = sdef
        .type_parameters
        .iter()
        .map(|tp| format!("parseTypeTagOrThrow({})", tp.param.user_specified_name))
        .join(", ");

    let arguments = sdef
        .type_parameters
        .iter()
        .map(|tp| (format!("  .argument('<TYPE_{}>')", tp.param.user_specified_name)))
        .join("\n");
    let command_name = action_name.replace('_', "-");

    let body = format!(
        r###"
const {} = async (owner: string{}) => {{
  const {{client}} = readConfig(program);
  const repo = getProjectRepo();
  const owner_ = new HexString(owner);
  const value = await {}.load(repo, client, owner_, [{}])
  const entries = await value.getIterTableEntries_{}(client, repo);
  for (const entry of entries) {{
    console.log();
    console.log(`Entry:`);
    print(entry[0]);
    print(entry[1]);
  }}
}}

program
  .command("{}")
  .argument("<ADDRESS:owner>"){}
  .action({})
"###,
        action_name,
        if !type_param_decls.is_empty() {
            format!(", {}", type_param_decls)
        } else {
            "".to_string()
        },
        struct_qualified_name,
        type_tags_inner,
        field_name,
        command_name,
        if !arguments.is_empty() {
            format!("\n{}", arguments)
        } else {
            "".to_ascii_lowercase()
        },
        action_name,
    );
    (body, package_name)
}

pub fn generate_cli(ctx: &Context) -> Result<(String, String), Diagnostics> {
    let mut commands = vec![];
    let mut printers = vec![];
    let mut imported_packages = BTreeSet::new();
    for cmd_param in ctx.cmds.iter() {
        let command_res = generate_command(cmd_param);
        if let Ok((cmd_str, package_name)) = command_res {
            commands.push(cmd_str);
            imported_packages.insert(package_name);
        } else {
            let diag = command_res.err().unwrap();
            let mut diags = Diagnostics::new();
            diags.add(diag);
            return Err(diags);
        }
    }
    for method in ctx.printer_methods.iter() {
        let (mi, sname, sdef, fname, fsig) = method;
        // if sdef is a resource type, generate printer for it
        if sdef.abilities.has_ability_(Ability_::Key) {
            let printer_res = generate_printer(mi, sname, sdef, fname, fsig);
            if let Ok((printer_body, package_name)) = printer_res {
                printers.push(printer_body);
                imported_packages.insert(package_name);
            } else {
                println!(
                    "Skipping cmd_printer generation for {} as it contains unsupported arguments",
                    fname
                );
            }
        }
    }
    for query in ctx.queries.iter() {
        let command_res = generate_query_printer(query);
        if let Ok((cmd_str, package_name)) = command_res {
            commands.push(cmd_str);
            imported_packages.insert(package_name);
        } else {
            let diag = command_res.err().unwrap();
            let mut diags = Diagnostics::new();
            diags.add(diag);
            return Err(diags);
        }
    }
    for show_iter_table in ctx.all_shows_iter_tables.iter() {
        let (mi, sname, sdef, field_name) = show_iter_table;
        let (printer_body, package_name) = generate_iter_table_printer(mi, sname, sdef, field_name);
        printers.push(printer_body);
        imported_packages.insert(package_name);
    }
    let package_imports = imported_packages
        .iter()
        .map(|name| format!("import * as {} from './{}';", capitalize(name), name))
        .join("\n");
    let filename = "cli.ts".to_string();
    let content = format!(
        r###"
import {{ AptosParserRepo, getTypeTagFullname, StructTag, parseTypeTagOrThrow, u8, u16, u32, u64, u128, u256, print, strToU8, u8str, DummyCache, ActualStringClass, sendPayloadTx, sendPayloadTxAndLog, getSimulationKeys }} from "@manahippo/move-to-ts";
import {{ AptosAccount, AptosClient, HexString, Types }} from "aptos";
import {{ Command }} from "commander";
import {{ getProjectRepo }} from "./";
import * as fs from "fs";
import * as yaml from "yaml";
{}

export const readConfig = (program: Command) => {{
  const {{config, profile}} = program.opts();
  const ymlContent = fs.readFileSync(config, {{encoding: "utf-8"}});
  const result = yaml.parse(ymlContent);
  //console.log(result);
  if (!result.profiles) {{
    throw new Error("Expect a profiles to be present in yaml config");
  }}
  if (!result.profiles[profile]) {{
    throw new Error(`Expect a ${{profile}} profile to be present in yaml config`);
  }}
  const url = result.profiles[profile].rest_url;
  const privateKeyStr = result.profiles[profile].private_key;
  if (!url) {{
    throw new Error(`Expect rest_url to be present in ${{profile}} profile`);
  }}
  if (!privateKeyStr) {{
    throw new Error(`Expect private_key to be present in ${{profile}} profile`);
  }}
  const privateKey = new HexString(privateKeyStr);
  const client = new AptosClient(result.profiles[profile].rest_url);
  const account = new AptosAccount(privateKey.toUint8Array());
  console.log(`Using address ${{account.address().hex()}}`);
  return {{client, account}};
}}

const program = new Command();

program
  .name('yarn cli')
  .description('Move TS CLI generated by move-to-ts')
  .requiredOption('-c, --config <path>', 'path to your aptos config.yml (generated with "aptos init")')
  .option('-p, --profile <PROFILE>', 'aptos config profile to use', 'default')

{}

{}

program.parse();
"###,
        package_imports,
        commands.join("\n"),
        printers.join("\n"),
    );
    Ok((filename, content))
}
