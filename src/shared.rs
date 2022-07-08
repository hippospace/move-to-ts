use crate::tsgen_writer::TsgenWriter;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{
        codes::{Category, DiagnosticCode, Severity},
        Diagnostic,
    },
    expansion::ast::{Address, ModuleIdent},
    naming::ast::{
        BuiltinTypeName_, FunctionSignature, StructTypeParameter, TParam, Type, TypeName_, Type_,
    },
};
use move_ir_types::location::Loc;
use std::collections::BTreeSet;
use std::fmt;

#[derive(Copy, Clone)]
pub struct NotTranslatable {}

impl DiagnosticCode for NotTranslatable {
    const CATEGORY: Category = Category::TypeSafety;
    fn severity(self) -> Severity {
        Severity::BlockingError
    }

    fn code_and_message(self) -> (u8, &'static str) {
        (1, "Not Translatable")
    }
}

macro_rules! derr {
    ($primary: expr $(,)?) => {{
        Err(Diagnostic::new(
            NotTranslatable{},
            $primary,
            std::iter::empty::<(Loc, String)>(),
            std::iter::empty::<String>(),
        ))
    }};
    ($primary: expr, $($secondary: expr),+ $(,)?) => {{
        Err(Diagnostic::new(
            NotTranslatable{},
            $primary,
            vec![$($secondary, )*],
            std::iter::empty::<String>(),
        ))
    }};
}

pub(crate) use derr;

pub struct Context {
    pub current_module: Option<ModuleIdent>,
    pub current_function_signature: Option<FunctionSignature>,
    // modules imported from same package
    pub same_package_imports: BTreeSet<String>,
    // external packages imported
    pub package_imports: BTreeSet<String>,
}

impl Context {
    pub fn new() -> Self {
        Self {
            current_module: None,
            current_function_signature: None,
            same_package_imports: BTreeSet::new(),
            package_imports: BTreeSet::new(),
        }
    }

    pub fn is_current_package(&self, other: &ModuleIdent) -> bool {
        match self.current_module.unwrap().value.address {
            // Address eq implementation ignores name, but we cannot ignore that
            Address::Numerical(name, num) => match other.value.address {
                Address::Numerical(name2, num2) => name == name2 && num == num2,
                _ => false,
            },
            Address::NamedUnassigned(_) => {
                self.current_module.unwrap().value.address == other.value.address
            }
        }
    }

    pub fn is_current_module(&self, other: &ModuleIdent) -> bool {
        self.current_module.unwrap() == *other
    }

    pub fn add_same_package_import(&mut self, modname: String) {
        self.same_package_imports.insert(modname);
    }

    pub fn add_package_import(&mut self, modname: String) {
        self.package_imports.insert(modname);
    }

    pub fn get_tparam_index(&self, tparam: &TParam) -> Option<usize> {
        match &self.current_function_signature {
            None => None,
            Some(sig) => {
                let found = sig
                    .type_parameters
                    .iter()
                    .find_position(|tp| tp.user_specified_name == tparam.user_specified_name);

                found.map(|(idx, _tp)| idx)
            }
        }
    }
}

pub trait AstTsPrinter {
    const CTOR_NAME: &'static str;

    fn term(&self, _c: &mut Context) -> TermResult {
        panic!("term() not implemented for {}", Self::CTOR_NAME);
    }

    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        w.write(self.term(c)?);

        Ok(())
    }
}

pub type TermResult = Result<String, Diagnostic>;
pub type WriteResult = Result<(), Diagnostic>;

pub fn quote(quoted: &impl fmt::Display) -> String {
    format!("\"{}\"", quoted)
}

pub fn comma_term<T, F: Fn(T, &mut Context) -> TermResult>(
    items: impl std::iter::IntoIterator<Item = T>,
    c: &mut Context,
    f: F,
) -> TermResult {
    let mut parts = vec![];
    for item in items.into_iter() {
        parts.push(f(item, c)?);
    }
    Ok(parts.join(", "))
}

pub fn format_address(address: Address) -> String {
    // this one prefers Name if it exists
    match address {
        Address::Numerical(Some(name), _) => format!("{}", &name),
        Address::Numerical(None, numerical_address) => format!("X{}", &numerical_address),
        Address::NamedUnassigned(name) => format!("{}", &name),
    }
}

pub fn format_address_hex(address: Address) -> String {
    // this one prefers Name if it exists
    match address {
        Address::Numerical(_, hex) => format!("{}", hex.value.into_inner().to_hex_literal()),
        Address::NamedUnassigned(_name) => "".to_string(),
    }
}

pub fn ts_format_address_as_literal(addr: &Address, loc: Loc) -> TermResult {
    /*
    e.g.:
    - new HexString("0x1")
    - AptosFramework.address
     */
    match addr {
        Address::Numerical(_opt_name, numerical) => Ok(format!(
            "new HexString(\"{}\")",
            numerical.value.into_inner().to_hex_literal()
        )),
        Address::NamedUnassigned(name) => derr!((loc, format!("Unassigned address: {}", name))),
    }
}

pub fn format_qualified_name(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
    c: &mut Context,
) -> String {
    if c.is_current_module(mident) {
        // name exists in same module, no qualifier needed
        format!("{}", name)
    } else if c.is_current_package(mident) {
        // name exists in same package, just add module name as qualifier
        c.add_same_package_import(mident.value.module.to_string());
        format!("{}.{}", mident.value.module, name)
    } else {
        // name exists in a different package, use fully qualified name
        let package_name = format_address(mident.value.address);
        c.add_package_import(package_name.clone());
        format!("{}.{}.{}", package_name, mident.value.module, name)
    }
}

pub fn type_to_typetag_builder(
    ty: &Type,
    tparams: &Vec<StructTypeParameter>,
    c: &mut Context,
) -> TermResult {
    match &ty.value {
        Type_::Param(tp) => {
            let idx = tparams
                .iter()
                .find_position(|tp2| tp2.param.user_specified_name == tp.user_specified_name)
                .unwrap()
                .0;
            Ok(format!("new TypeParamIdx({})", idx))
        }
        Type_::Unit => derr!((ty.loc, "Cannot construct Unit type")),
        Type_::Ref(_mut, _s) => derr!((ty.loc, "Cannot construct typetag for Ref type")),
        // Apply-Multiple
        Type_::Apply(_abilities_opt, typename, ss) => match &typename.value {
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::Vector => {
                    assert!(ss.len() == 1);
                    let inner_builder = type_to_typetag_builder(&ss[0], tparams, c)?;
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
                let tparams = format!(
                    "[{}]",
                    comma_term(ss, c, |t, c| type_to_typetag_builder(&t, tparams, c))?
                );
                Ok(format!(
                    "new StructTag(new HexString({}), {}, {}, {})",
                    quote(&address),
                    quote(&modname),
                    quote(sname),
                    tparams
                ))
            }
            TypeName_::Multiple(_) => derr!((ty.loc, "Cannot construct typeTag for tuples")),
        },
        Type_::Var(_tv) => derr!((ty.loc, "Received Type variable")),
        Type_::Anything => derr!((ty.loc, "Cannot construct typetag for the Anything type")),
        Type_::UnresolvedError => derr!((ty.loc, "Received Unresolved Type")),
    }
}

pub fn type_to_typetag(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Param(tp) => {
            let idx = c.get_tparam_index(tp).unwrap();
            Ok(format!("$p[{}]", idx))
        }
        Type_::Unit => derr!((ty.loc, "Cannot construct Unit type")),
        Type_::Ref(_mut, _s) => derr!((ty.loc, "Cannot construct typetag for Ref type")),
        // Apply-Multiple
        Type_::Apply(_abilities_opt, typename, ss) => match &typename.value {
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::Vector => {
                    assert!(ss.len() == 1);
                    let inner_builder = type_to_typetag(&ss[0], c)?;
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
                let tparams = format!("[{}]", comma_term(ss, c, |t, c| type_to_typetag(&t, c))?);
                Ok(format!(
                    "new StructTag(new HexString({}), {}, {}, {})",
                    quote(&address),
                    quote(&modname),
                    quote(sname),
                    tparams
                ))
            }
            TypeName_::Multiple(_) => derr!((ty.loc, "Cannot construct typeTag for tuples")),
        },
        Type_::Var(_tv) => derr!((ty.loc, "Received Type variable")),
        Type_::Anything => derr!((ty.loc, "Cannot construct typetag for the Anything type")),
        Type_::UnresolvedError => derr!((ty.loc, "Received Unresolved Type")),
    }
}
