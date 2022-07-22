use crate::tsgen_writer::TsgenWriter;
use clap::Parser;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{
        codes::{Category, DiagnosticCode, Severity},
        Diagnostic,
    },
    expansion::ast::{Address, Attribute, ModuleIdent},
    hlir::ast::*,
    naming::ast::{BuiltinTypeName_, StructTypeParameter, TParam},
    parser::ast::FunctionName,
};
use move_ir_types::location::Loc;
use std::collections::{BTreeMap, BTreeSet};
use std::fmt;
use std::path::PathBuf;

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

#[derive(Parser, Clone)]
#[clap(author, version, about)]
pub struct MoveToTsOptions {
    /// Path to a package which the command should be run with respect to.
    #[clap(
        long = "path",
        short = 'p',
        global = true,
        parse(from_os_str),
        default_value = "."
    )]
    pub package_path: PathBuf,
    /// generate #[test] functions
    #[clap(long = "test", short = 't')]
    pub test: bool,
    /// generate package.json
    #[clap(long = "package-json-name", short = 'n', default_value = "")]
    pub package_json_name: String,
}

use crate::utils::rename;
pub(crate) use derr;
use move_command_line_common::address::NumericalAddress;

pub struct Context {
    pub current_module: Option<ModuleIdent>,
    pub current_function_signature: Option<FunctionSignature>,
    // modules imported from same package
    pub same_package_imports: BTreeSet<String>,
    // external packages imported
    pub package_imports: BTreeSet<String>,
    // all modules
    pub visited_modules: BTreeSet<ModuleIdent>,
    // external packages imported
    pub visited_packages: BTreeMap<String, Address>,
    // configs
    pub config: MoveToTsOptions,
    // unit test info
    pub tests: Vec<(
        FunctionName,
        FunctionSignature,
        Attribute,
        Option<Attribute>,
    )>,
}

pub fn is_same_package(a1: Address, a2: Address) -> bool {
    match a1 {
        // Address eq implementation ignores name, but we cannot ignore that
        Address::Numerical(name, num) => match a2 {
            Address::Numerical(name2, num2) => name == name2 && num == num2,
            _ => false,
        },
        Address::NamedUnassigned(_) => a1 == a2,
    }
}

impl Context {
    pub fn new(config: &MoveToTsOptions) -> Self {
        Self {
            current_module: None,
            current_function_signature: None,
            same_package_imports: BTreeSet::new(),
            package_imports: BTreeSet::new(),
            visited_modules: BTreeSet::new(),
            visited_packages: BTreeMap::new(),
            config: config.clone(),
            tests: vec![],
        }
    }

    pub fn reset_for_module(&mut self, mname: ModuleIdent) {
        self.current_module = Some(mname);
        self.same_package_imports.clear();
        self.package_imports.clear();
        self.tests.clear();
        // additive
        self.visited_modules.insert(mname);
        self.visited_packages
            .insert(format_address(mname.value.address), mname.value.address);
    }

    pub fn is_current_package(&self, other: &ModuleIdent) -> bool {
        is_same_package(
            self.current_module.unwrap().value.address,
            other.value.address,
        )
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

pub fn comma_term_opt<T, F: Fn(T, &mut Context) -> TermResult>(
    items: impl std::iter::IntoIterator<Item = T>,
    c: &mut Context,
    f: F,
    always_output: bool,
) -> TermResult {
    let mut parts = vec![];
    for item in items.into_iter() {
        let result = f(item, c)?;
        if always_output || !result.is_empty() {
            parts.push(result);
        }
    }
    Ok(parts.join(", "))
}

pub fn comma_term<T, F: Fn(T, &mut Context) -> TermResult>(
    items: impl std::iter::IntoIterator<Item = T>,
    c: &mut Context,
    f: F,
) -> TermResult {
    comma_term_opt(items, c, f, true)
}

/*
pub fn semicolon_term<T, F: Fn(T, &mut Context) -> TermResult>(
    items: impl std::iter::IntoIterator<Item = T>,
    c: &mut Context,
    f: F,
) -> TermResult {
    let mut parts = vec![];
    for item in items.into_iter() {
        let result = f(item, c)?;
        if !result.is_empty() {
            parts.push(result);
        }
    }
    Ok(parts.join("; "))
}
 */

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

pub fn format_qualified_name(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
    c: &mut Context,
) -> String {
    let name = rename(name);
    if c.is_current_module(mident) {
        // name exists in same module, no qualifier needed
        name
    } else if c.is_current_package(mident) {
        // name exists in same package, just add module name as qualifier
        c.add_same_package_import(mident.value.module.to_string());
        format!("{}$_.{}", mident.value.module, name)
    } else {
        // name exists in a different package, use fully qualified name
        let package_name = format_address(mident.value.address);
        c.add_package_import(package_name.clone());
        format!("{}$_.{}$_.{}", package_name, mident.value.module, name)
    }
}

pub fn base_type_to_typetag_builder(
    base_ty: &BaseType,
    tparams: &Vec<StructTypeParameter>,
    c: &mut Context,
) -> TermResult {
    match &base_ty.value {
        BaseType_::Param(tp) => {
            let idx = tparams
                .iter()
                .find_position(|tp2| tp2.param.user_specified_name == tp.user_specified_name)
                .unwrap()
                .0;
            Ok(format!("new $.TypeParamIdx({})", idx))
        }
        BaseType_::Apply(_, typename, ss) => match &typename.value {
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::Vector => {
                    assert!(ss.len() == 1);
                    let inner_builder = base_type_to_typetag_builder(&ss[0], tparams, c)?;
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
                    comma_term(ss, c, |t, c| base_type_to_typetag_builder(t, tparams, c))?
                );
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
                Ok(format!(
                    "new StructTag(new HexString({}), {}, {}, {})",
                    quote(&address),
                    quote(&modname),
                    quote(sname),
                    tparams
                ))
            }
        },
        BaseType_::UnresolvedError => derr!((base_ty.loc, "Received Unresolved Type")),
        BaseType_::Unreachable => derr!((base_ty.loc, "Received Unresolved Type")),
    }
}

pub fn type_to_typetag(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Unit => derr!((ty.loc, "Cannot construct Unit type")),
        Type_::Single(single_ty) => match &single_ty.value {
            SingleType_::Ref(_, _) => derr!((ty.loc, "Cannot construct typetag for Ref type")),
            SingleType_::Base(base_ty) => base_type_to_typetag(base_ty, c),
        },
        Type_::Multiple(_) => derr!((ty.loc, "Cannot construct typeTag for tuples")),
    }
}
