use crate::shared::*;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{Diagnostic, Diagnostics},
    expansion::ast::{Attribute, AttributeValue, AttributeValue_, Attribute_},
    hlir::ast::*,
    parser::ast::FunctionName,
};
use move_ir_types::location::Loc;
use crate::ast_ts_printer::AstTsPrinter;
use crate::context::Context;
use crate::types::{TermResult, WriteResult};
use crate::utils::tsgen_writer::TsgenWriter;
use crate::utils::utils::{format_address, format_function_name, quote};
use crate::derr;

pub fn generate(c: &mut Context) -> Result<(String, String), Diagnostics> {
    let mut w = TsgenWriter::new();
    let output = write_tests(&mut w, c);
    match output {
        Ok(_) => {
            let mident = c.current_module.unwrap();
            let filename = format!(
                "{}/{}.test.ts",
                format_address(mident.value.address),
                mident.value.module
            );
            let content = format!("{}", w);
            Ok((filename, content))
        }
        Err(diag) => {
            let mut diags = Diagnostics::new();
            diags.add(diag);
            Err(diags)
        }
    }
}

fn format_attribute_value(val: &AttributeValue, c: &mut Context) -> TermResult {
    match &val.value {
        AttributeValue_::Value(val) => val.term(c),
        AttributeValue_::ModuleAccess(ma) => ma.term(c),
    }
}



fn get_abort_code_from_expected_failure(expected_failure: &Attribute) -> String {
    if let Attribute_::Parameterized(_, attrs_inner) = &expected_failure.value {
        for (name, attr) in attrs_inner.key_cloned_iter() {
            if name.to_string() == "abort_code" {
                if let Attribute_::Assigned(_, val) = &attr.value {
                    if let AttributeValue_::Value(v) = &val.value {
                        use move_compiler::expansion::ast::Value_ as V;
                        return match &v.value {
                            V::U8(u) => quote(u),
                            V::U64(u) => quote(u),
                            V::U128(u) => quote(u),
                            V::InferredNum(u) => quote(u),
                            _ => "".to_string(),
                        };
                    }
                }
            }
        }
    }
    "".to_string()
}

 fn write_tests(w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
    let mident = c.current_module.unwrap();

    w.writeln(format!(
        "import * as Source from '../../{}/{}'; ",
        format_address(mident.value.address),
        mident.value.module
    ));
    w.writeln("import * as $ from '@manahippo/move-to-ts';");
    w.writeln("import { HexString } from 'aptos';");

    w.new_line();

    let async_modifier = if c.is_async() { "async " } else { "" };

    // one test runner for each $[test]
    for (name, sig, attr, expect_failure_attr) in c.tests.clone().iter() {
        w.writeln(format!(
            "test('{}::{}', {} () => {{",
            mident.value.module, name, async_modifier
        ));
        w.increase_indent();

        w.writeln("const $c = new $.AptosLocalCache();");

        match &attr.value {
            Attribute_::Name(_) | Attribute_::Assigned(_, _) => {
                if !sig.parameters.is_empty() {
                    return derr!((attr.loc, "Not all test arguments are assigned value"));
                }
            }
            Attribute_::Parameterized(_, param_vals) => {
                for (pname, pval) in param_vals.key_cloned_iter() {
                    if let Attribute_::Assigned(_pname, pval) = &pval.value {
                        w.writeln(format!(
                            "const {} = {};",
                            pname,
                            format_attribute_value(pval, c)?
                        ));
                    } else {
                        return derr!((pval.loc, "not sure how to handle this"));
                    }
                }
            }
        }

        let args = sig
            .parameters
            .iter()
            .map(|(var, _ty)| var.to_string())
            .join(", ");
        let raw_fname = format!("Source.{}", name);
        if let Some(failure_attr) = expect_failure_attr {
            let abort_code = get_abort_code_from_expected_failure(failure_attr);
            let throw_detector = if c.is_async() {
                "rejects.toThrow"
            } else {
                "toThrow"
            };
            w.writeln(format!(
                "expect( {}() => {}({}{}$c) ).{}({});",
                async_modifier,
                format_function_name(&raw_fname, c.is_async()),
                args,
                if !args.is_empty() { ", " } else { "" },
                throw_detector,
                abort_code,
            ));
        } else {
            w.writeln(format!(
                "{}({}{}$c);",
                format_function_name(&raw_fname, c.is_async()),
                args,
                if !args.is_empty() { ", " } else { "" }
            ));
        }

        w.decrease_indent();
        w.writeln("});");
        w.new_line();
    }

    Ok(())
}
