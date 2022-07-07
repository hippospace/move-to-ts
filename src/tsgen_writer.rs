use move_compiler::diagnostics::Diagnostic;
use std::collections::HashSet;

pub struct TsgenWriter {
    margin: usize,
    import_set: HashSet<String>,
    imports: Vec<String>,
    lines: Vec<String>,
}

impl TsgenWriter {
    pub fn new() -> Self {
        Self {
            margin: 0,
            import_set: HashSet::new(),
            imports: vec![],
            lines: vec![String::new()],
        }
    }

    fn cur(&mut self) -> &mut String {
        self.lines.last_mut().unwrap()
    }

    pub fn import(&mut self, line: String) {
        if !self.import_set.contains(&line) {
            self.import_set.insert(line.clone());
            self.imports.push(line);
        }
    }

    pub fn new_line(&mut self) {
        self.lines.push(String::new());
    }

    pub fn write(&mut self, s: impl AsRef<str>) {
        let margin = self.margin;
        let cur = self.cur();
        if cur.is_empty() {
            (0..margin).for_each(|_| cur.push(' '));
        }
        cur.push_str(s.as_ref());
    }

    pub fn export_const(&mut self, name: &str, value: String) {
        self.writeln(format!("export const {} = {};", name, value));
    }

    pub fn writeln(&mut self, s: impl AsRef<str>) {
        self.write(s);
        self.new_line();
    }

    pub fn indent<F: FnMut(&mut TsgenWriter) -> Result<(), Diagnostic>>(
        &mut self,
        inc: usize,
        mut f: F,
    ) -> Result<(), Diagnostic> {
        self.new_line();
        self.margin += inc;
        f(self)?;
        self.margin -= inc;
        self.new_line();
        Ok(())
    }

    pub fn increase_indent(&mut self) {
        self.margin += 2;
    }

    pub fn decrease_indent(&mut self) {
        self.margin -= 2;
    }

    pub fn short_block<F: FnMut(&mut TsgenWriter) -> Result<(), Diagnostic>>(
        &mut self,
        f: F,
    ) -> Result<(), Diagnostic> {
        self.write("{");
        self.indent(2, f)?;
        self.write("}");
        Ok(())
    }

    pub fn list<T, F: FnMut(&mut TsgenWriter, T) -> Result<bool, Diagnostic>>(
        &mut self,
        items: impl std::iter::IntoIterator<Item = T>,
        sep: &str,
        mut f: F,
    ) -> Result<(), Diagnostic> {
        let iter = items.into_iter();
        let len = match iter.size_hint() {
            (lower, None) => {
                assert!(lower == 0);
                return Ok(());
            }
            (_, Some(len)) => len,
        };
        for (idx, item) in iter.enumerate() {
            let needs_newline = f(self, item)?;
            if idx + 1 != len {
                self.write(sep);
                if needs_newline {
                    self.new_line()
                }
            }
        }
        Ok(())
    }
}

impl std::fmt::Display for TsgenWriter {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        for line in &self.lines {
            writeln!(f, "{}", line)?;
        }
        Ok(())
    }
}
