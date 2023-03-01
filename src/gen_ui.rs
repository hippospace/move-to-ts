use crate::ast_to_ts::is_type_signer;
use crate::gen_cli::{format_qualified_payload_fname_and_import, stype_to_ts_parser};
use crate::shared::*;
use crate::tsgen_writer::TsgenWriter;
use itertools::Itertools;
use move_compiler::diagnostics::{Diagnostic, Diagnostics};
use move_compiler::hlir::ast::{BaseType, BaseType_, SingleType, SingleType_, TypeName_};
use move_compiler::naming::ast::{BuiltinTypeName_, TParam};
use move_compiler::parser::ast::Var;
use move_ir_types::location::Loc;
use std::collections::{BTreeMap, BTreeSet};

pub fn base_type_to_typetag_builder(base_ty: &BaseType, tparams: &Vec<TParam>) -> TermResult {
    match &base_ty.value {
        BaseType_::Param(tp) => {
            let idx = tparams
                .iter()
                .find_position(|tp2| tp2.user_specified_name == tp.user_specified_name)
                .unwrap()
                .0;
            Ok(format!("new TypeParamIdx({})", idx))
        }
        BaseType_::Apply(_, typename, ss) => match &typename.value {
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::Vector => {
                    assert!(ss.len() == 1);
                    let inner_builder = base_type_to_typetag_builder(&ss[0], tparams)?;
                    Ok(format!("new VectorTag({})", inner_builder))
                }
                BuiltinTypeName_::Bool => Ok("AtomicTypeTag.Bool".to_string()),
                BuiltinTypeName_::U8 => Ok("AtomicTypeTag.U8".to_string()),
                BuiltinTypeName_::U16 => Ok("AtomicTypeTag.U16".to_string()),
                BuiltinTypeName_::U32 => Ok("AtomicTypeTag.U32".to_string()),
                BuiltinTypeName_::U64 => Ok("AtomicTypeTag.U64".to_string()),
                BuiltinTypeName_::U128 => Ok("AtomicTypeTag.U128".to_string()),
                BuiltinTypeName_::U256 => Ok("AtomicTypeTag.U256".to_string()),
                BuiltinTypeName_::Address => Ok("AtomicTypeTag.Address".to_string()),
                BuiltinTypeName_::Signer => Ok("AtomicTypeTag.Signer".to_string()),
                BuiltinTypeName_::Fun => Ok("AtomicTypeTag.Fun".to_string()),
            },
            TypeName_::ModuleType(mident, sname) => {
                let address = format_address_hex(mident.value.address);
                let modname = mident.value.module;
                let mut tparam_parts = vec![];
                for base in ss.iter() {
                    tparam_parts.push(base_type_to_typetag_builder(base, tparams)?);
                }
                let tparams = format!("[{}]", tparam_parts.join(", "));
                Ok(format!(
                    "new StructTag(new HexString({}), {}, {}, {})",
                    quote(&address),
                    quote(&modname),
                    quote(&sname),
                    tparams
                ))
            }
        },
        _ => derr!((base_ty.loc, "Received Unresolved Type")),
    }
}

pub fn write_cmd_arg(
    var: &Var,
    stype: &SingleType,
    tparams: &Vec<TParam>,
    w: &mut TsgenWriter,
) -> WriteResult {
    w.writeln("{");
    w.increase_indent();

    let type_tag_builder = match &stype.value {
        SingleType_::Ref(_, _) => unreachable!(),
        SingleType_::Base(base) => base_type_to_typetag_builder(base, tparams)?,
    };
    w.writeln(format!("name: {},", quote(var)));
    w.writeln(format!("typeTag: {},", type_tag_builder));

    w.decrease_indent();
    w.writeln("},");

    Ok(())
}

pub fn write_command(cmd: &CmdParams, w: &mut TsgenWriter) -> TermResult {
    w.writeln("{");
    w.increase_indent();

    w.writeln(format!("module: {},", quote(&cmd.mi.value.module)));
    w.writeln(format!("name: {},", quote(&cmd.fname)));
    w.writeln(format!(
        "typeArgs: [{}],",
        cmd.func
            .signature
            .type_parameters
            .iter()
            .map(|tp| quote(&tp.user_specified_name.to_string()))
            .join(", ")
    ));
    w.writeln("args: [");
    w.increase_indent();

    let param_no_signers = cmd
        .func
        .signature
        .parameters
        .iter()
        .filter(|(_n, ty)| !is_type_signer(ty))
        .collect::<Vec<_>>();
    for (var, stype) in param_no_signers.iter() {
        write_cmd_arg(var, stype, &cmd.func.signature.type_parameters, w)?;
    }
    w.decrease_indent();
    w.writeln("],");
    w.writeln("type: \"cmd\",");

    let type_param_names = cmd
        .func
        .signature
        .type_parameters
        .iter()
        .map(|tparam| tparam.user_specified_name.to_string())
        .collect::<Vec<_>>();
    let param_names_no_signer = param_no_signers
        .iter()
        .map(|(name, _)| name.to_string())
        .collect::<Vec<_>>();
    let mut all_params = vec![];
    all_params.extend(type_param_names.clone());
    all_params.extend(param_names_no_signer.clone());
    let param_decl = all_params
        .iter()
        .map(|pname| format!("{}_: string", pname))
        .join(", ");
    w.writeln(format!(
        "invoker: async (client: AptosClient, account: AptosAccount, {}) => {{",
        param_decl
    ));
    w.increase_indent();
    for tparam in cmd.func.signature.type_parameters.iter() {
        let tname = tparam.user_specified_name;
        w.writeln(format!(
            "const {} = parseTypeTagOrThrow({}_);",
            tname, tname
        ));
    }
    for (pname, ptype) in param_no_signers {
        w.writeln(format!(
            "const {} = {};",
            pname,
            stype_to_ts_parser(&format!("{}_", pname), pname.0.loc, ptype)?
        ));
    }
    let (payload_builder, package_name) =
        format_qualified_payload_fname_and_import(&cmd.mi, &cmd.fname);
    w.writeln(format!(
        "const payload = {}({}{});",
        payload_builder,
        param_names_no_signer.join(", "),
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
                type_param_names.join(", ")
            )
        }
    ));
    w.writeln("await sendPayloadTx(client, account, payload);");

    w.decrease_indent();
    w.writeln("}");

    w.decrease_indent();
    w.writeln("},");

    Ok(package_name)
}

pub fn write_module(
    package_name: &String,
    module_name: &String,
    cmds: &[&CmdParams],
    all_imported_packages: &mut BTreeSet<String>,
    w: &mut TsgenWriter,
) -> WriteResult {
    w.writeln("{");
    w.increase_indent();
    w.writeln(format!("name: {},", quote(module_name)));
    w.writeln(format!("package: {},", quote(package_name)));

    w.writeln("commands: [");
    w.increase_indent();

    for cmd in cmds.iter() {
        all_imported_packages.insert(write_command(cmd, w)?);
    }

    w.decrease_indent();
    w.writeln("],");

    w.decrease_indent();
    w.writeln("},");

    Ok(())
}

pub fn write_package(
    name: &String,
    module_cmds: &[(&String, &Vec<&CmdParams>)],
    all_imported_packages: &mut BTreeSet<String>,
    w: &mut TsgenWriter,
) -> WriteResult {
    w.writeln("{");
    w.increase_indent();
    w.writeln(format!("name: {},", quote(name)));

    w.writeln("modules: [");
    w.increase_indent();
    for (module, cmds) in module_cmds.iter() {
        write_module(name, module, cmds, all_imported_packages, w)?;
    }
    w.decrease_indent();
    w.writeln("],");

    w.writeln("shows: [");
    w.writeln("],");
    w.decrease_indent();
    w.writeln("},");

    Ok(())
}

pub fn generate_ui(ctx: &mut Context) -> Result<Vec<(String, String)>, Diagnostics> {
    let index_tsx_1 = r###"
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import ReactDOM from 'react-dom/client';
import { AptosParserRepo, getTypeTagFullname, StructTag, TypeTag, AtomicTypeTag, VectorTag, parseTypeTagOrThrow, u8, u16, u32, u64, u128, u256, print, strToU8, u8str, DummyCache }
from
"@manahippo/move-to-ts";
import './index.css';
import { AptosAccount, AptosClient, HexString, Types } from "aptos";

interface IArg {
  name: string;
  typeTag: TypeTag;
}

interface ICommand {
  module: string;
  name: string;
  typeArgs: string[];
  args: IArg[];
  type: "cmd";
  invoker: Function;
}

interface IShow {
  module: string;
  name: string;
  type: "show",
}

interface IModule {
  package: string;
  name: string;
  commands: ICommand[];
}

interface IPackage {
  name: string;
  modules: IModule[];
  shows: IShow[];
}

interface IContent {
  packages: IPackage[];
}

function isShow(v: any) {
  return v.type === 'show';
}

/*
function isCommand(v: any) {
  return v.type === 'command';
}
*/


const App = () => {
  const [mainItem, setMainItem] = useState(null as (IShow | ICommand | null))

  const NavContent = (content: IContent) => {
    return (
      <div>
        {content.packages.map(NavPackage)}
      </div>
    )
  }


  const NavPackage = (pkg: IPackage) => {
    return (
      <div>
        <h3 className="ui header">{pkg.name}</h3>
        <div>
          {pkg.modules.map(NavModule)}
        </div>
        <div>
          {pkg.shows.map(NavShow)}
        </div>
      </div>
    )
  }

  const NavModule = (module: IModule) => {
    return (
      <div>
        <h4 className="ui header">{module.package}::{module.name}</h4>
        <div>
          {module.commands.map(NavCommand)}
        </div>
      </div>
    )
  }

  const NavCommand = (cmd: ICommand) => {
    function setCurrentCommand() {
      setMainItem(cmd);
    }
    return (
      <div className="NavCommand" onClick={setCurrentCommand}>
        {cmd.name}
      </div>
    )
  }

  const NavShow = (show: IShow) => {
    function setCurrentShow() {
      setMainItem(show);
    }
    return (
      <div className="NavShow" onClick={setCurrentShow}>
        {show.name}
      </div>
    )
  }

  const TypeArgInput = (typeArg: string) => {
    return (
      <div>
        <Input label={typeArg} placeholder="0xaddr::module_name::StructName"></Input>
      </div>
    )
  }

  const ArgInput = (arg: IArg) => {
    return (
      <div>
        <Input label={arg.name} placeholder={getTypeTagFullname(arg.typeTag)}></Input>
      </div>
    )
  }

  const CommandContainer = (cmd: ICommand) => {
    return (
      <div className="CommandContainer">
        <h1 className="ui header">{`Command: ${cmd.name}`}</h1>
        <div className="CommandContent">
          <div>Module: {cmd.module}</div>
          <div>Command: {cmd.name}</div>
          {cmd.typeArgs.map(TypeArgInput)}
          {cmd.args.map(ArgInput)}
        </div>
      </div>
    )
  }

  const ShowContainer = (show: IShow) => {
    return (
      <h1 className="ui header">{`Show: ${show.name}`}</h1>
    )
  }

  return (
    <div className="App">
      <div className="NavBar">
        {NavContent(content)}
      </div>
      <div className="Main">
        {
          mainItem === null ? (<div></div>) :
          isShow(mainItem) ? ShowContainer(mainItem as IShow) :
          CommandContainer(mainItem as ICommand)
        }
      </div>
    </div>
  )
}

"###;

    let mut writer = TsgenWriter::new();
    writer.write(index_tsx_1);
    let mut package_names: BTreeSet<String> = BTreeSet::new();
    let mut packaged_cmds: BTreeMap<(String, String), Vec<&CmdParams>> = BTreeMap::new();
    for cmd in ctx.cmds.iter() {
        let pkg_name = format_address(cmd.mi.value.address);
        package_names.insert(pkg_name.clone());
        let module_name = cmd.mi.value.module.to_string();
        if let Some(inner_cmds) = packaged_cmds.get_mut(&(pkg_name.clone(), module_name.clone())) {
            inner_cmds.push(cmd);
        } else {
            packaged_cmds.insert((pkg_name, module_name), vec![cmd]);
        }
    }
    writer.writeln("const content: IContent = {");
    writer.increase_indent();

    writer.writeln("packages: [");
    writer.increase_indent();

    let mut all_imported_packages: BTreeSet<String> = BTreeSet::new();

    for package_name in package_names.iter() {
        let package_modules = packaged_cmds
            .iter()
            .filter(|((n1, _), _)| n1 == package_name)
            .map(|((_, n2), v)| (n2, v))
            .collect::<Vec<_>>();

        if let Err(diag) = write_package(
            package_name,
            &package_modules,
            &mut all_imported_packages,
            &mut writer,
        ) {
            let mut diags = Diagnostics::new();
            diags.add(diag);
            return Err(diags);
        }
    }
    writer.decrease_indent();
    writer.writeln("]");

    writer.decrease_indent();
    writer.writeln("};");

    let index_tsx_2 = r###"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);


export async function sendPayloadTx(
  client: AptosClient,
  account: AptosAccount,
  payload: Types.TransactionPayload,
  max_gas=1000
){
  const txnRequest = await client.generateTransaction(account.address(), payload, {max_gas_amount: `${max_gas}`});
  const signedTxn = await client.signTransaction(account, txnRequest);
  const txnResult = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(txnResult.hash);
  const txDetails = (await client.getTransactionByHash(txnResult.hash)) as Types.UserTransaction;
  console.log(txDetails);
}

"###;
    writer.write(index_tsx_2);

    let imports = all_imported_packages
        .iter()
        .map(|pname| format!("import * as {}$_ from './{}';", pname, pname))
        .join("\n");

    let index_tsx = format!("{}\n{}", imports, writer);

    let index_css = r###"
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.App {
  text-align: center;
  height: 800px;
  width: calc(100%);
  display: flex;
  background-color: black;
}

.PackageHeader {
  background-color: burlywood;
  margin: 4px;
}

.NavBar {
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
}

.Main {
  width: calc(100% - 200px);
  background-color: bisque;
}

.NavCommand {
  margin: 4px;
}

.NavCommand:hover {
  background-color: white;
}

.NavShow {
  margin: 4px;
}

.NavShow:hover {
  background-color: white;
}

.CommandContent {
  padding: 8px;
  text-align: left;
}
"###;
    Ok(vec![
        ("index.tsx".to_string(), index_tsx),
        ("index.css".to_string(), index_css.to_string()),
    ])
}

pub fn gen_public_html() -> (String, String) {
    let index_html = r###"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Move-to-ts Playground</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
"###;
    ("index.html".to_string(), index_html.to_string())
}
