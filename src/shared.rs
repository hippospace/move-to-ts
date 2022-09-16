use crate::tsgen_writer::TsgenWriter;
use clap::Parser;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{
        codes::{Category, DiagnosticCode, Severity},
        Diagnostic,
    },
    expansion::ast::{Address, Attribute, AttributeValue_, Attribute_, ModuleIdent},
    hlir::ast::*,
    naming::ast::{BuiltinTypeName_, StructTypeParameter, TParam},
    parser::ast::{FunctionName, StructName},
    shared::Name,
};
use move_ir_types::location::Loc;
use std::collections::{BTreeMap, BTreeSet};
use std::fmt;
use std::path::PathBuf;
use std::rc::Rc;




use crate::utils::{capitalize, rename};
pub(crate) use derr;
use move_command_line_common::address::NumericalAddress;
use crate::types::TermResult;


pub fn is_same_package(a1: Address, a2: Address) -> bool {
    match a1 {
        // Address eq implementation ignores name, but we cannot ignore that
        Address::Numerical(name, num) => match a2 {
            Address::Numerical(name2, num2) => {
                // FIXME temporary patch to get around aptos_framework namespacing error
                if num.value.eq(&NumericalAddress::parse_str("0x1").unwrap()) {
                    num == num2
                } else {
                    name == name2 && num == num2
                }
            }
            _ => false,
        },
        Address::NamedUnassigned(_) => a1 == a2,
    }
}

pub fn is_same_module(mi1: &ModuleIdent, mi2: &ModuleIdent) -> bool {
    mi1.value == mi2.value
}


pub fn quote(quoted: &impl fmt::Display) -> String {
    format!("\"{}\"", quoted)
}





pub fn format_address_(address: Address, use_stdlib: bool) -> String {
    // this one prefers Name if it exists
    match address {
        Address::Numerical(Some(name), addr) => {
            // FIXME: this is a temporary fix needed to address the wrongly quoted namespaces in
            // aptos_framework
            if use_stdlib && addr.value.eq(&NumericalAddress::parse_str("0x1").unwrap()) {
                "stdlib".to_string()
            } else {
                format!("{}", &name)
            }
        }
        Address::Numerical(None, numerical_address) => format!("X{}", &numerical_address),
        Address::NamedUnassigned(name) => format!("{}", &name),
    }
}

pub fn format_address(address: Address) -> String {
    format_address_(address, true)
}

pub fn format_address_hex(address: Address) -> String {
    // this one prefers Name if it exists
    match address {
        Address::Numerical(_, hex) => hex.value.into_inner().to_hex_literal(),
        Address::NamedUnassigned(_name) => "".to_string(),
    }
}

pub fn ts_format_numerical_address(numerical: &NumericalAddress) -> TermResult {
    Ok(format!(
        "new HexString(\"{}\")",
        numerical.into_inner().to_hex_literal()
    ))
}

pub fn ts_format_address_as_literal(addr: &Address, loc: Loc) -> TermResult {
    /*
    e.g.:
    - new HexString("0x1")
    - AptosFramework.address
     */
    match addr {
        Address::Numerical(_opt_name, numerical) => ts_format_numerical_address(&numerical.value),
        Address::NamedUnassigned(name) => derr!((loc, format!("Unassigned address: {}", name))),
    }
}



pub fn format_function_name(fname: &impl fmt::Display, is_async: bool) -> String {
    let await_modifier = if is_async { "await " } else { "" };
    format!("{}{}_", await_modifier, fname)
}

pub fn base_type_to_typetag_builder(
    base_ty: &BaseType,
    tparams: &Vec<StructTypeParameter>,
    c: &mut Context,
) -> TermResult {
    base_type_to_typetag_builder_inner(base_ty, tparams, c, false)
}

pub fn base_type_to_typetag(base_ty: &BaseType, c: &mut Context) -> TermResult {
    match &base_ty.value {
        BaseType_::Param(tp) => {
            let idx = c.get_tparam_index(tp).unwrap();
            Ok(format!("$p[{}]", idx))
        }
        BaseType_::Apply(_, typename, ss) => match &typename.value {
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::Vector => {
                    assert!(ss.len() == 1);
                    let inner_builder = base_type_to_typetag(&ss[0], c)?;
                    Ok(format!("new VectorTag({})", inner_builder))
                }
                BuiltinTypeName_::Bool => Ok("AtomicTypeTag.Bool".to_string()),
                BuiltinTypeName_::U8 => Ok("AtomicTypeTag.U8".to_string()),
                BuiltinTypeName_::U64 => Ok("AtomicTypeTag.U64".to_string()),
                BuiltinTypeName_::U128 => Ok("AtomicTypeTag.U128".to_string()),
                BuiltinTypeName_::Address => Ok("AtomicTypeTag.Address".to_string()),
                BuiltinTypeName_::Signer => Ok("AtomicTypeTag.Signer".to_string()),
            },
            TypeName_::ModuleType(mident, sname) => {
                let address = format_address_hex(mident.value.address);
                let modname = mident.value.module;
                let tparams = format!("[{}]", comma_term(ss, c, base_type_to_typetag)?);
                if c.is_current_module(mident) {
                    Ok(format!(
                        "new SimpleStructTag({}{})",
                        sname,
                        if tparams.len() == 2 {
                            "".to_string()
                        } else {
                            format!(", {}", tparams)
                        }
                    ))
                } else {
                    Ok(format!(
                        "new StructTag(new HexString({}), {}, {}, {})",
                        quote(&address),
                        quote(&modname),
                        quote(sname),
                        tparams
                    ))
                }
            }
        },
        BaseType_::UnresolvedError => derr!((base_ty.loc, "Received Unresolved Type")),
        BaseType_::Unreachable => derr!((base_ty.loc, "Received Unresolved Type")),
    }
}

pub fn type_to_typetag(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Unit => derr!((ty.loc, "Cannot construct Unit types")),
        Type_::Single(single_ty) => match &single_ty.value {
            SingleType_::Ref(_, _) => derr!((ty.loc, "Cannot construct typetag for Ref types")),
            SingleType_::Base(base_ty) => base_type_to_typetag(base_ty, c),
        },
        Type_::Multiple(_) => derr!((ty.loc, "Cannot construct typeTag for tuples")),
    }
}

pub fn extract_attribute_value_string(attr: &Attribute) -> Option<String> {
    use move_compiler::expansion::ast::Value_ as EV;
    match &attr.value {
        Attribute_::Assigned(_, v) => match &v.value {
            AttributeValue_::Value(value) => match &value.value {
                EV::Bytearray(bytes) => {
                    let str_val =
                        String::from_utf8(bytes.clone()).unwrap_or_else(|_| String::from(""));
                    Some(str_val)
                }
                _ => None,
            },
            _ => None,
        },
        _ => None,
    }
}

pub fn is_typename_string(typename: &TypeName) -> bool {
    match &typename.value {
        TypeName_::ModuleType(mi, sname) => {
            let address = format_address_hex(mi.value.address);
            let short_name = format!("{}::{}::{}", address, mi.value.module, sname);
            short_name == "0x1::string::String"
        }
        _ => false,
    }
}
