use crate::Context;

mod ast_exp;
mod ast_to_ts;

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