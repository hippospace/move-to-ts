use move_compiler::diagnostics::codes::{Category, DiagnosticCode, Severity};

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