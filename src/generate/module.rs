use crate::ast_ts_printer::ast_exp::*;
use crate::shared::*;
use itertools::Itertools;
use move_compiler::parser::ast::Field;
use move_compiler::shared::Name;
use move_compiler::{
    diagnostics::{Diagnostic, Diagnostics},
    expansion::ast::{Attribute_, Attributes, ModuleIdent},
    hlir::ast::*,
    naming::ast::{BuiltinTypeName_, StructTypeParameter},
    parser::ast::{Ability_, ConstantName, FunctionName, StructName, Var},
};
use move_ir_types::location::Loc;
use std::collections::BTreeSet;
use crate::ast_ts_printer::AstTsPrinter;
use crate::context::Context;
use crate::utils::tsgen_writer::TsgenWriter;
use crate::utils::utils::{capitalize, format_address};

pub fn generate(
    mident: ModuleIdent,
    mdef: &ModuleDefinition,
    c: &mut Context,
) -> Result<(String, String), Diagnostics> {
    let filename = format!(
        "{}/{}.ts",
        format_address(mident.value.address),
        mident.value.module
    );
    c.reset_for_module(mident);
    let content = to_ts_string(&(mident, mdef), c);
    match content {
        Err(diag) => {
            let mut diags = Diagnostics::new();
            diags.add(diag);
            Err(diags)
        }
        Ok(res) => Ok((filename, res)),
    }
}
fn to_ts_string(v: &impl AstTsPrinter, c: &mut Context) -> Result<String, Diagnostic> {

    let mut lines = vec![
        "import * as $ from \"@manahippo/move-to-ts\";".to_string(),
        "import {AptosDataCache, AptosParserRepo, DummyCache, AptosLocalCache} from \"@manahippo/move-to-ts\";".to_string(),
        "import {U8, U64, U128} from \"@manahippo/move-to-ts\";".to_string(),
        "import {u8, u64, u128} from \"@manahippo/move-to-ts\";".to_string(),
        "import {TypeParamDeclType, FieldDeclType} from \"@manahippo/move-to-ts\";".to_string(),
        "import {AtomicTypeTag, StructTag, TypeTag, VectorTag, SimpleStructTag} from \"@manahippo/move-to-ts\";"
            .to_string(),
        "import {HexString, AptosClient, AptosAccount, TxnBuilderTypes, Types} from \"aptos\";".to_string(),
    ];
    for package_name in c.package_imports.iter() {
        lines.push(format!(
            "import * as {} from \"../{}\";",
            capitalize(package_name),
            package_name
        ));
    }
    for module_name in c.same_package_imports.iter() {
        lines.push(format!(
            "import * as {} from \"./{}\";",
            capitalize(module_name),
            module_name
        ));
    }

    let mut writer = TsgenWriter::new();
    v.write_ts(&mut writer, c)?;
    lines.push(format!("{}", writer));
    Ok(lines.join("\n"))
}

