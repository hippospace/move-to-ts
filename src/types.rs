use move_compiler::diagnostics::Diagnostic;

pub type TermResult = Result<String, Diagnostic>;
pub type WriteResult = Result<(), Diagnostic>;
