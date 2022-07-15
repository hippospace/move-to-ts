use crate::shared::*;
use crate::tsgen_writer::TsgenWriter;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{Diagnostic, Diagnostics},
    expansion::ast::{Attribute, AttributeValue, AttributeValue_, Attribute_},
    hlir::ast::*,
    parser::ast::FunctionName,
};
use move_ir_types::location::Loc;

pub fn check_test(
    name: &FunctionName,
    func: &Function,
    c: &mut Context,
) -> Result<bool, Diagnostic> {
    let test_attr = func
        .attributes
        .key_cloned_iter()
        .filter(|(k, _)| {
            let string_name = k.to_string();
            string_name == "test"
        })
        .collect::<Vec<_>>();

    let expect_failure_attr = func
        .attributes
        .key_cloned_iter()
        .find(|(k, _)| {
            let string_name = k.to_string();
            string_name == "expected_failure"
        })
        .map(|(_k, v)| v.clone());

    if !test_attr.is_empty() {
        if test_attr.len() != 1 {
            return derr!((
                test_attr[1].1.loc,
                "This unit test has more than one #test attribute"
            ));
        }

        c.tests.push((
            *name,
            func.signature.clone(),
            test_attr[0].1.clone(),
            expect_failure_attr,
        ));

        return Ok(true);
    }

    let test_only = func.attributes.key_cloned_iter().any(|(k, _)| {
        let string_name = k.to_string();
        string_name == "test_only"
    });

    Ok(!test_attr.is_empty() || test_only)
}

pub fn format_attribute_value(val: &AttributeValue, c: &mut Context) -> TermResult {
    match &val.value {
        AttributeValue_::Value(val) => val.term(c),
        AttributeValue_::ModuleAccess(ma) => ma.term(c),
    }
}

pub fn generate_tests(c: &mut Context) -> Result<(String, String), Diagnostics> {
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

pub fn get_abort_code_from_expected_failure( expected_failure: &Attribute, ) -> String {
    match &expected_failure.value {
        Attribute_::Parameterized(_, attrs_inner) => {
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
                            }
                        }
                    }
                }
            }
        }
        _ => (),
    }
    "".to_string()
}

pub fn write_tests(w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
    let mident = c.current_module.unwrap();

    w.writeln(format!(
        "import * as Source from '../../{}/{}'; ",
        format_address(mident.value.address),
        mident.value.module
    ));
    w.writeln("import * as $ from '@manahippo/move-to-ts';");
    w.writeln("import { HexString } from 'aptos';");

    w.new_line();

    // one test runner for each $[test]
    for (name, sig, attr, expect_failure_attr) in c.tests.clone().iter() {
        w.writeln(format!(
            "test('{}::{}', () => {{",
            mident.value.module, name
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
        if let Some(failure_attr) = expect_failure_attr {
            let abort_code = get_abort_code_from_expected_failure(failure_attr);
            w.writeln(format!(
                "expect( () => Source.{}$({}{}$c) ).toThrow({});",
                name,
                args,
                if !args.is_empty() { ", " } else { "" },
                abort_code,
            ));
        } else {
            w.writeln(format!(
                "Source.{}$({}{}$c);",
                name,
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
