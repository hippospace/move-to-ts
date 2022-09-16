use move_compiler::{
    diagnostics::Diagnostic,
    parser::ast::{FunctionName},
    expansion::ast::{ModuleIdent},
    hlir::ast::*,
};
use std::path::PathBuf;


pub type TermResult = Result<String, Diagnostic>;
pub type WriteResult = Result<(), Diagnostic>;

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
    #[clap(
    long = "output-path",
    short = 'o',
    global = true,
    parse(from_os_str),
    default_value = ""
    )]
    pub output_path: PathBuf,
    /// generate #[test] functions
    #[clap(long = "test-address", short = 't', default_value = "")]
    pub test_address: String,
    #[clap(long = "gen-cli", short = 'c')]
    pub cli: bool,
    #[clap(long = "gen-ui", short = 'u')]
    pub ui: bool,
    // default to synchronous functions but allow synchronous version to be output as well
    #[clap(long = "asynchronous", short = 'a')]
    pub asynchronous: bool,
    /// generate package.json
    #[clap(long = "package-json-name", short = 'n', default_value = "")]
    pub package_json_name: String,
}

pub struct CmdParams {
    pub mi: ModuleIdent,
    pub fname: FunctionName,
    pub func: Function,
    pub desc: Option<String>,
}