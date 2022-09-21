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
use crate::types::{CmdParams, MoveToTsOptions, TermResult};
use crate::utils::utils;
use crate::utils::utils::{capitalize, format_address, format_address_hex, is_same_package, quote, rename};


pub struct Context {
    pub program: Rc<Program>,
    pub build_root_path: PathBuf,
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
    // cmd info
    pub cmds: Vec<CmdParams>,
    // query info
    pub queries: Vec<CmdParams>,
    // all shows collected
    pub printer_methods: Vec<(
        ModuleIdent,
        StructName,
        StructDefinition,
        Name,
        FunctionSignature,
    )>,
    // all show_iter_table directives collected
    pub all_shows_iter_tables: Vec<(ModuleIdent, StructName, StructDefinition, Name)>,
}
impl Context {
    pub fn new(config: &MoveToTsOptions, program: Rc<Program>, build_root_path: PathBuf) -> Self {
        Self {
            program,
            build_root_path,
            current_module: None,
            current_function_signature: None,
            same_package_imports: BTreeSet::new(),
            package_imports: BTreeSet::new(),
            visited_modules: BTreeSet::new(),
            visited_packages: BTreeMap::new(),
            config: config.clone(),
            tests: vec![],
            cmds: vec![],
            queries: vec![],
            printer_methods: vec![],
            all_shows_iter_tables: vec![],
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

    pub fn add_cmd(
        &mut self,
        mi: &ModuleIdent,
        fname: &FunctionName,
        func: &Function,
        desc: Option<String>,
    ) {
        self.cmds.push(CmdParams {
            mi: *mi,
            fname: *fname,
            func: func.clone(),
            desc,
        });
    }

    pub fn add_query(&mut self, mi: &ModuleIdent, fname: &FunctionName, func: &Function) {
        self.queries.push(CmdParams {
            mi: *mi,
            fname: *fname,
            func: func.clone(),
            desc: None,
        });
    }

    pub fn has_query(&self, mi: &ModuleIdent, fname: &FunctionName) -> bool {
        self.queries
            .iter()
            .any(|params| params.mi == *mi && params.fname == *fname)
    }

    pub fn add_printer_method(
        &mut self,
        mi: &ModuleIdent,
        sname: &StructName,
        sdef: &StructDefinition,
        fname: &Name,
        sig: &FunctionSignature,
    ) {
        self.printer_methods
            .push((*mi, *sname, sdef.clone(), *fname, sig.clone()));
    }

    pub fn add_show_iter_table(
        &mut self,
        mi: &ModuleIdent,
        sname: &StructName,
        sdef: &StructDefinition,
        field_name: &Name,
    ) {
        self.all_shows_iter_tables
            .push((*mi, *sname, sdef.clone(), *field_name));
    }

    pub fn is_async(&self) -> bool {
        self.config.asynchronous
    }

    pub fn comma_term_opt<T, F: Fn(T, &mut Context) -> TermResult>(
        &mut self,
        items: impl IntoIterator<Item = T>,
        f: F,
        always_output: bool,
    ) -> TermResult {
        let mut parts = vec![];
        for item in items.into_iter() {
            let result = f(item, self)?;
            if always_output || !result.is_empty() {
                parts.push(result);
            }
        }
        Ok(parts.join(", "))
    }
    pub fn comma_term<T, F: Fn(T, &mut Context) -> TermResult>(
        &mut self,
        items: impl IntoIterator<Item = T>,
        f: F,
    ) -> TermResult {
        self.comma_term_opt(items, f, true)
    }

    pub fn format_qualified_name(
        &mut self,
        mident: &ModuleIdent,
        name: &impl fmt::Display,

    ) -> String {
        let name = rename(name);
        if c.is_current_module(mident) {
            // name exists in same module, no qualifier needed
            name
        } else if c.is_current_package(mident) {
            // name exists in same package, just add module name as qualifier
            self.add_same_package_import(mident.value.module.to_string());
            format!("{}.{}", capitalize(&mident.value.module), name)
        } else {
            // name exists in a different package, use fully qualified name
            let package_name = format_address(mident.value.address);
            self.add_package_import(package_name.clone());
            format!(
                "{}.{}.{}",
                capitalize(&package_name),
                capitalize(&mident.value.module),
                name
            )
        }
    }

    pub fn write_file(&self, path:&str, pair: (String, String)){
        if path.is_empty() {
            utils::write_file(&self.build_root_path, pair)
        } else {
            utils::write_file(&self.build_root_path.join(path), pair)
        }
    }
}
