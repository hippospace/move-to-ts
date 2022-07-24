use crate::ast_to_ts::is_type_signer;
use crate::shared::*;
use itertools::Itertools;
use move_compiler::diagnostics::{Diagnostic, Diagnostics};
use move_compiler::expansion::ast::ModuleIdent;
use move_compiler::hlir::ast::{
    BaseType, BaseType_, SingleType, SingleType_, StructDefinition, TypeName_,
};
use move_compiler::naming::ast::BuiltinTypeName_;
use move_compiler::parser::ast::{Ability_, StructName, Var};
use move_compiler::shared::Name;
use move_ir_types::location::Loc;
use std::collections::BTreeSet;
use std::fmt;

pub fn generate_package_json(package_name: String, cli: bool, ui: bool) -> (String, String) {
    let ui_dependencies = r###"
    "react": "^18.1.0",
"###;
    let cli_dependencies = r###"
    "commander": "^9.3.0",
    "yaml": "^2.1.1",
"###;
    let cli_script = r###"
    "cli": "node dist/cli.js",
"###;
    let content = format!(
        r###"
{{
  "name": "{}",
  "version": "0.0.1",
  "scripts": {{
    "build": "rm -rf dist; tsc -p tsconfig.json",{}
    "test": "jest"
  }},
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": [ "src", "dist" ],
  "devDependencies": {{
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.31",
    "@typescript-eslint/eslint-plugin": "^5.22.0",
    "@typescript-eslint/parser": "^5.22.0",
    "eslint": "^8.15.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^27.5.1",
    "prettier": "^2.6.2",
    "ts-jest": "^27.1.4",{}
    "typescript": "^4.6.4"
  }},
  "dependencies": {{
    "aptos": "^1.2.0",
    "big-integer": "^1.6.51",{}
    "@manahippo/move-to-ts": "^0.0.55"
  }}
}}
"###,
        package_name,
        if cli { cli_script } else { "" },
        if ui { ui_dependencies } else { "" },
        if cli { cli_dependencies } else { "" },
    );
    ("package.json".to_string(), content)
}

pub fn generate_ts_config() -> (String, String) {
    let content = r###"
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
"###;
    ("tsconfig.json".to_string(), content.to_string())
}

pub fn generate_jest_config() -> (String, String) {
    let content = r###"
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist/*"],
};
"###;
    ("jest.config.js".to_string(), content.to_string())
}

/*
1. Replace typescript keywords with WORD__
2. rename temporary variables
 */
pub fn rename(name: &impl fmt::Display) -> String {
    let name_str = format!("{}", name);
    match name_str.as_str() {
        "new" => "new__".to_string(),
        "default" => "default__".to_string(),
        "for" => "for__".to_string(),
        _ => {
            if name_str.starts_with("%#") {
                // replace temporaries
                format!("temp${}", name_str.split_at(2).1)
            } else if name_str.contains("#") {
                // normalize shadowed variable names
                name_str.replace("#", "__")
            } else {
                name_str
            }
        }
    }
}

pub fn generate_index(package_name: &String, modules: &Vec<&ModuleIdent>) -> (String, String) {
    let filename = format!("{}/index.ts", package_name);
    let exports = modules
        .iter()
        .map(|mi| {
            format!(
                "export * as {}$_ from './{}';\n",
                mi.value.module, mi.value.module
            )
        })
        .collect::<Vec<_>>()
        .join("");

    let imports = modules
        .iter()
        .map(|mi| {
            format!(
                "import * as {}$_ from './{}';\n",
                mi.value.module, mi.value.module
            )
        })
        .collect::<Vec<_>>()
        .join("");

    let loads = modules
        .iter()
        .map(|mi| format!("  {}$_.loadParsers(repo);", mi.value.module))
        .join("\n");

    let content = format!(
        r###"
import {{ AptosParserRepo }} from "@manahippo/move-to-ts";
{}
{}

export function loadParsers(repo: AptosParserRepo) {{
{}
}}

export function getPackageRepo(): AptosParserRepo {{
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}}
"###,
        imports, exports, loads
    );

    (filename, content)
}

pub fn generate_topmost_index(packages: &Vec<&String>) -> (String, String) {
    let filename = "index.ts".to_string();
    let exports = packages
        .iter()
        .map(|package_name| format!("export * as {} from './{}';\n", package_name, package_name))
        .collect::<Vec<_>>()
        .join("");

    let imports = packages
        .iter()
        .map(|package_name| format!("import * as {} from './{}';\n", package_name, package_name))
        .collect::<Vec<_>>()
        .join("");

    let loads = packages
        .iter()
        .map(|p| format!("  {}.loadParsers(repo);", p))
        .join("\n");

    let content = format!(
        r###"
import {{ AptosParserRepo }} from "@manahippo/move-to-ts";
{}
{}

export function getProjectRepo(): AptosParserRepo {{
  const repo = new AptosParserRepo();
{}
  repo.addDefaultParsers();
  return repo;
}}
"###,
        imports, exports, loads
    );

    (filename, content)
}

pub fn get_table_helper_decl() -> String {
    r###"
export class TypedTable<K, V> {
  static buildFromField<K, V>(table: Table, field: FieldDeclType): TypedTable<K, V> {
    const tag = field.typeTag;
    if (!(tag instanceof StructTag)) {
      throw new Error();
    }
    if (tag.getParamlessName() !== '0x1::table::Table') {
      throw new Error();
    }
    if (tag.typeParams.length !== 2) {
      throw new Error();
    }
    const [keyTag, valueTag] = tag.typeParams;
    return new TypedTable<K, V>(table, keyTag, valueTag);
  }

  constructor(
    public table: Table,
    public keyTag: TypeTag,
    public valueTag: TypeTag
  ) {
  }

  async loadEntryRaw(client: AptosClient, key: K): Promise<any> {
    return await client.getTableItem(this.table.handle.value.toString(), {
      key_type: $.getTypeTagFullname(this.keyTag),
      value_type: $.getTypeTagFullname(this.valueTag),
      key: $.moveValueToOpenApiObject(key, this.keyTag),
    });
  }

  async loadEntry(client: AptosClient, repo: AptosParserRepo, key: K): Promise<V> {
    const rawVal = await this.loadEntryRaw(client, key);
    return repo.parse(rawVal.data, this.valueTag);
  }
}
"###
    .to_string()
}

pub fn get_iterable_table_helper_decl() -> String {
    r###"
export class TypedIterableTable<K, V> {
  static buildFromField<K, V>(table: IterableTable, field: FieldDeclType): TypedIterableTable<K, V> {
    const tag = field.typeTag;
    if (!(tag instanceof StructTag)) {
      throw new Error();
    }
    if (tag.getParamlessName() !== '0x1::iterable_table::IterableTable') {
      throw new Error();
    }
    if (tag.typeParams.length !== 2) {
      throw new Error();
    }
    const [keyTag, valueTag] = tag.typeParams;
    return new TypedIterableTable<K, V>(table, keyTag, valueTag);
  }

  iterValueTag: StructTag;
  constructor(
    public table: IterableTable,
    public keyTag: TypeTag,
    public valueTag: TypeTag
  ) {
    this.iterValueTag = new StructTag(moduleAddress, moduleName, "IterableValue", [keyTag, valueTag])
  }

  async loadEntryRaw(client: AptosClient, key: K): Promise<any> {
    return await client.getTableItem(this.table.inner.handle.value.toString(), {
      key_type: $.getTypeTagFullname(this.keyTag),
      value_type: $.getTypeTagFullname(this.iterValueTag),
      key: $.moveValueToOpenApiObject(key, this.keyTag),
    });
  }

  async loadEntry(client: AptosClient, repo: AptosParserRepo, key: K): Promise<IterableValue> {
    const rawVal = await this.loadEntryRaw(client, key);
    return repo.parse(rawVal.data, this.iterValueTag) as IterableValue;
  }

  async fetchAll(client: AptosClient, repo: AptosParserRepo): Promise<[K, V][]> {
    const result: [K, V][] = [];
    const cache = new $.DummyCache();
    let next = this.table.head;
    while(next && std$_.option$_.is_some$(next, cache, [this.keyTag])) {
      const key = std$_.option$_.borrow$(next, cache, [this.keyTag]) as K;
      const iterVal = await this.loadEntry(client, repo, key);
      const value = iterVal.val as V;
      result.push([key, value]);
      next = iterVal.next;
    }
    return result;
  }
}
"###
        .to_string()
}

pub fn vector_type_ts_parser(name: &Var, element_type: &BaseType) -> TermResult {
    match &element_type.value {
        BaseType_::Param(tparam) => {
            derr!((
                element_type.loc,
                "Generic-typed arguments not supported at entry function invocation (yet)"
            ))
        }
        BaseType_::Apply(_, typename, _) => match &typename.value {
            TypeName_::ModuleType(_, _) => {
                derr!((
                    element_type.loc,
                    "struct types cannot be used at entry function invocation"
                ))
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

pub fn stype_to_ts_parser(name: &Var, stype: &SingleType) -> TermResult {
    let base = match &stype.value {
        SingleType_::Base(b) => b,
        SingleType_::Ref(_, b) => b,
    };
    match &base.value {
        BaseType_::Param(tparam) => {
            derr!((
                name.0.loc,
                "Generic-typed arguments not supported at entry function invocation (yet)"
            ))
        }
        BaseType_::Apply(_, typename, targs) => match &typename.value {
            TypeName_::ModuleType(_, _) => {
                derr!((
                    stype.loc,
                    "struct types cannot be used at entry function invocation"
                ))
            }
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::U8 => Ok(format!("u8({})", name)),
                BuiltinTypeName_::U64 => Ok(format!("u64({})", name)),
                BuiltinTypeName_::U128 => Ok(format!("u128({})", name)),
                BuiltinTypeName_::Bool => Ok(format!("{}", name)),
                BuiltinTypeName_::Address => Ok(format!("new HexString({})", name)),
                BuiltinTypeName_::Signer => unreachable!(),
                BuiltinTypeName_::Vector => {
                    assert!(targs.len() == 1);
                    vector_type_ts_parser(name, &targs[0])
                }
            },
        },
        _ => unreachable!(),
    }
}

pub fn format_qualified_fname_and_import(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
) -> (String, String) {
    // name exists in a different package, use fully qualified name
    let package_name = format_address(mident.value.address);
    (
        format!(
            "{}$_.{}$_.buildPayload_{}",
            package_name, mident.value.module, name
        ),
        package_name,
    )
}

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
    let param_decl = all_params
        .iter()
        .map(|pname| format!("{}: string", pname))
        .join(", ");
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
            stype_to_ts_parser(pname, ptype)?
        ));
        arguments.push(format!("  .argument('<{}>')", pname));
    }
    let (payload_builder, package_name) = format_qualified_fname_and_import(&cmd.mi, &cmd.fname);
    let payload = format!(
        "{}({}{})",
        payload_builder,
        param_names_no_signer
            .clone()
            .iter()
            .map(|pname| format!("{}_", pname))
            .join(", "),
        if cmd.func.signature.type_parameters.len() == 0 {
            "".to_string()
        } else {
            format!(
                "{}[{}]",
                if param_names_no_signer.len() > 0 {
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
    let command_name = cmd.fname.to_string().replace("_", "-");
    let description = cmd.desc.clone().unwrap_or_default();
    let action_body = format!(
        r###"
const action_{} = async ({}) => {{
  const {{client, account}} = readConfig(program);
{}
  const payload = {};
  await sendPayloadTx(client, account, payload);
}}

program
  .command("{}")
  .description("{}")
{}
  .action(action_{});
"###,
        cmd.fname,
        param_decl,
        param_parsers.join("\n"),
        payload,
        command_name,
        description,
        arguments.join("\n"),
        cmd.fname,
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
            "{}$_.{}$_.{}",
            package_name,
            mident.value.module,
            rename(name)
        ),
        package_name,
    )
}

pub fn generate_printer(
    mi: &ModuleIdent,
    sname: &StructName,
    sdef: &StructDefinition,
    fname: &Name,
) -> (String, String) {
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

    let command_name = fname.to_string().replace("_", "-");

    let body = format!(
        r###"
const {} = async (owner: string, {}) => {{
  const {{client}} = readConfig(program);
  const repo = getProjectRepo();
  const owner_ = new HexString(owner);
  const value = await {}.load(repo, client, owner_, [{}])
  print(value.{}());
}}

program
  .command("{}")
  .argument("<ADDRESS:owner>")
{}
  .action({})
"###,
        fname,
        type_param_decls,
        struct_qualified_name,
        type_tags_inner,
        fname,
        command_name,
        arguments,
        fname,
    );

    (body, package_name)
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

    let command_name = action_name.to_string().replace("_", "-");

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
        if type_param_decls.len() > 0 {
            format!(", {}", type_param_decls)
        } else {
            "".to_string()
        },
        struct_qualified_name,
        type_tags_inner,
        field_name,
        command_name,
        if arguments.len() > 0 {format!("\n{}", arguments)} else {"".to_ascii_lowercase()},
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
    for show in ctx.all_shows.iter() {
        let (mi, sname, sdef, fname) = show;
        // if sdef is a resource type, generate printer for it
        if sdef.abilities.has_ability_(Ability_::Key) {
            let (printer_body, package_name) = generate_printer(mi, sname, sdef, fname);
            printers.push(printer_body);
            imported_packages.insert(package_name);
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
        .map(|name| format!("import * as {}$_ from './{}';", name, name))
        .join("\n");
    let filename = "cli.ts".to_string();
    let content = format!(
        r###"
import {{ AptosParserRepo, getTypeTagFullname, StructTag, parseTypeTagOrThrow, u8, u64, u128, print, strToU8, u8str, DummyCache }} from "@manahippo/move-to-ts";
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

export async function sendPayloadTx(
  client: AptosClient,
  account: AptosAccount,
  payload: Types.TransactionPayload,
  max_gas=1000
){{
  const txnRequest = await client.generateTransaction(account.address(), payload, {{max_gas_amount: `${{max_gas}}`}});
  const signedTxn = await client.signTransaction(account, txnRequest);
  const txnResult = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(txnResult.hash);
  const txDetails = (await client.getTransaction(txnResult.hash)) as Types.UserTransaction;
  console.log(txDetails);
}}

const program = new Command();

program
  .name('move-ts-cli')
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
