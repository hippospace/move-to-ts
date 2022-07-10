use crate::ast_exp::*;
use crate::ast_tests::check_test;
use crate::shared::*;
use crate::tsgen_writer::TsgenWriter;
use crate::utils::rename_keywords;
use itertools::Itertools;
use move_compiler::{
    diagnostics::{Diagnostic, Diagnostics},
    expansion::ast::ModuleIdent,
    naming::ast::{
        BuiltinTypeName_, FunctionSignature, StructDefinition, StructFields, StructTypeParameter,
        Type, TypeName_, Type_,
    },
    parser::ast::{Ability_, ConstantName, FunctionName, StructName, Var, Visibility},
    typing::ast::*,
};
use move_ir_types::location::Loc;
use std::collections::VecDeque;

pub fn translate_module(
    mident: ModuleIdent,
    mdef: &ModuleDefinition,
    c: &mut Context,
) -> Result<(String, String), Diagnostics> {
    let filename = format!(
        "{}/{}.ts",
        format_address(mident.value.address),
        mident.value.module
    );
    c.reset_for_module(mident);
    let content = to_ts_string(&(mident, mdef), c);
    match content {
        Err(diag) => {
            let mut diags = Diagnostics::new();
            diags.add(diag);
            Err(diags)
        }
        Ok(res) => Ok((filename, res)),
    }
}

pub fn to_ts_string(v: &impl AstTsPrinter, c: &mut Context) -> Result<String, Diagnostic> {
    let mut writer = TsgenWriter::new();
    v.write_ts(&mut writer, c)?;
    let mut lines = vec![
        "import * as $ from \"@manahippo/move-to-ts\";".to_string(),
        "import {AptosDataCache, AptosParserRepo} from \"@manahippo/move-to-ts\";".to_string(),
        "import {U8, U64, U128} from \"@manahippo/move-to-ts\";".to_string(),
        "import {u8, u64, u128} from \"@manahippo/move-to-ts\";".to_string(),
        "import {TypeParamDeclType, FieldDeclType} from \"@manahippo/move-to-ts\";".to_string(),
        "import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from \"@manahippo/move-to-ts\";"
            .to_string(),
        "import {HexString, AptosClient} from \"aptos\";".to_string(),
    ];
    for package_name in c.package_imports.iter() {
        lines.push(format!(
            "import * as {} from \"../{}\";",
            package_name, package_name
        ));
    }
    for module_name in c.same_package_imports.iter() {
        lines.push(format!(
            "import * as {} from \"./{}\";",
            module_name, module_name
        ));
    }
    lines.push(format!("{}", writer));
    Ok(lines.join("\n"))
}

impl AstTsPrinter for (ModuleIdent, &ModuleDefinition) {
    const CTOR_NAME: &'static str = "ModuleDefinition";
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        /*
        - imports (handled by TsgenWriter)
        - constants
        - structs
        - functions
         */
        let (name, module) = self;
        let ModuleDefinition {
            package_name,
            attributes: _,
            is_source_module: _,
            dependency_order: _,
            friends: _,
            structs,
            constants,
            functions,
        } = module;

        let package_name = package_name.map_or("".to_string(), |symbol| symbol.to_string());

        // module meta
        w.export_const("packageName", quote(&package_name));
        w.export_const(
            "moduleAddress",
            format!(
                "new HexString({})",
                quote(&format_address_hex(name.value.address))
            ),
        );
        w.export_const("moduleName", quote(&name.value.module.0));
        w.new_line();

        // constants
        for (cname, cdef) in constants.key_cloned_iter() {
            (cname, cdef).write_ts(w, c)?;
        }
        w.new_line();

        // structs
        for (sname, sdef) in structs.key_cloned_iter() {
            (sname, sdef).write_ts(w, c)?;
        }

        // functions
        for (fname, fdef) in functions.key_cloned_iter() {
            (fname, fdef).write_ts(w, c)?;
        }

        Ok(())
    }
}

impl AstTsPrinter for ConstantName {
    const CTOR_NAME: &'static str = "_ConstantName";
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(rename_keywords(self))
    }
}

impl AstTsPrinter for FunctionName {
    const CTOR_NAME: &'static str = "_FunctionName";
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(rename_keywords(self))
    }
}

impl AstTsPrinter for StructName {
    const CTOR_NAME: &'static str = "_StructName";
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(rename_keywords(self))
    }
}

impl AstTsPrinter for (ConstantName, &Constant) {
    const CTOR_NAME: &'static str = "ConstantDef";
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        let (
            name,
            Constant {
                attributes: _,
                loc: _loc,
                signature,
                value,
            },
        ) = self;
        let typename = ts_constant_type(signature, c)?;
        w.write(format!("export const {} : {} = ", name.term(c)?, typename));
        value.write_ts(w, c)?;
        w.writeln(";");
        Ok(())
    }
}

impl AstTsPrinter for StructTypeParameter {
    // only used by (StructName, &StructDefinition)
    const CTOR_NAME: &'static str = "StructTypeParameter";
    fn term(&self, _c: &mut Context) -> TermResult {
        let Self { is_phantom, param } = self;
        let name = rename_keywords(&quote(&param.user_specified_name));
        Ok(format!("{{ name: {}, isPhantom: {} }}", name, is_phantom))
    }
}

impl AstTsPrinter for (StructName, &StructDefinition) {
    const CTOR_NAME: &'static str = "StructDef";
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        let (name, sdef) = self;

        w.new_line();
        w.writeln(format!("export class {} ", name.term(c)?));
        w.short_block(|w| {
            w.writeln("static moduleAddress = moduleAddress;");
            w.writeln("static moduleName = moduleName;");
            w.writeln(format!("static structName: string = {};", quote(&name.term(c)?)));

            // 0. type parameters
            // 1. static field decl
            // 2. actual field decl
            // 3. ctor
            // 4. static parser
            // 5. resource loader

            // 0: type parameters
            w.write("static typeParameters: TypeParamDeclType[] = [");
            w.indent(2, |w| {
                w.list(&sdef.type_parameters, ",", |w, struct_tparam| {
                    w.write(struct_tparam.term(c)?);
                    Ok(true)
                })?;
                Ok(())
            })?;
            w.writeln("];");
            match &sdef.fields {
                StructFields::Native(_) => (),
                StructFields::Defined(fields) => {

                    // 1: static field decls
                    w.writeln("static fields: FieldDeclType[] = [");
                    w.list(fields.key_cloned_iter(), ",", |w, (name, (_, ty))| {
                        w.write(format!(
                            "{{ name: {}, typeTag: {} }}",
                            quote(&rename_keywords(&name)),
                            type_to_typetag_builder(ty, &sdef.type_parameters, c)?
                        ));
                        Ok(true)
                    })?;
                    w.writeln("];");
                    w.new_line();

                    // 2. actual class fields
                    if !fields.is_empty() {
                        w.list(fields.key_cloned_iter(), "", |w, (name, (_, ty))| {
                            w.write(format!("{}: {};", rename_keywords(&name), type_to_tstype
                                (ty, c)?));
                            Ok(true)
                        })?;
                        w.new_line();
                        w.new_line();
                    }

                    // 3. ctor
                    w.write("constructor(proto: any, public typeTag: TypeTag) {");
                    w.indent(2, |w| {
                        // one line for each field
                        w.list(fields.key_cloned_iter(), "", |w, (name, (_, ty))| {
                            let name = rename_keywords(&name);
                            let tstype = type_to_tstype(ty, c)?;
                            w.write(
                                format!("this.{} = proto['{}'] as {};", name, name, tstype));
                            Ok(true)
                        })?;
                        Ok(())
                    })?;
                    w.writeln("}");

                    // 4. static Parser
                    w.new_line();
                    w.writeln(format!("static {}Parser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : {} {{", name, name));
                    w.writeln(format!("  const proto = $.parseStructProto(data, typeTag, repo, {});", name));
                    w.writeln(format!("  return new {}(proto, typeTag);", name));
                    w.writeln("}");

                    // 5. resource loader
                    if sdef.abilities.has_ability_(Ability_::Key) {
                        w.new_line();
                        w.writeln("static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {");
                        w.writeln(format!("  const result = await repo.loadResource(client, address, {}, typeParams);", name));
                        w.writeln(format!("  return result as unknown as {};", name));
                        w.write("}");
                    }
                }
            };
            Ok(())
        })?;
        w.new_line();

        Ok(())
    }
}

pub fn write_parameters(
    sig: &FunctionSignature,
    w: &mut TsgenWriter,
    c: &mut Context,
) -> WriteResult {
    w.increase_indent();
    for (name, ty) in &sig.parameters {
        w.writeln(format!(
            "{}: {},",
            rename_keywords(name),
            type_to_tstype(ty, c)?
        ));
    }
    w.decrease_indent();

    Ok(())
}

impl AstTsPrinter for (FunctionName, &Function) {
    const CTOR_NAME: &'static str = "FunctionDef";
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        let (name, func) = self;
        c.current_function_signature = Some(func.signature.clone());
        let is_entry = matches!(func.visibility, Visibility::Script(_));
        if c.config.test {
            let is_test = check_test(name, func, c)?;
            if is_test {
                w.writeln("// test func");
            }
        }
        // yep, regardless of visibility, we always export it
        w.writeln(format!("export function {} (", rename_keywords(name)));
        // write parameters
        write_parameters(&func.signature, w, c)?;
        // cache & typeTags
        w.writeln("  $c: AptosDataCache,");
        let num_tparams = func.signature.type_parameters.len();
        let tpnames = if num_tparams == 0 {
            "".to_string()
        } else {
            func.signature
                .type_parameters
                .iter()
                .map(|tp| tp.user_specified_name.to_string())
                .join(", ")
        };
        if num_tparams > 0 {
            w.writeln(format!("  $p: TypeTag[], /* <{}>*/", tpnames));
        }
        // marks returnType or void
        w.write("): ");
        let ret_type_str = type_to_tstype(&func.signature.return_type, c)?;
        w.write(ret_type_str);
        w.write(" ");
        match &func.body.value {
            FunctionBody_::Native => {
                w.short_block(|w| {
                    w.writeln("throw new Error(\"Native function not implemented\");");
                    Ok(())
                })?;
            }
            FunctionBody_::Defined(seq) => {
                write_seq_possibly_return(seq, w, c)?;
            }
        }
        w.new_line();

        if is_entry {
            // TODO
            // uses entry-func signature, which returns TransactionInfo{toPayload(), send(),
            // sendAndWait()}
            w.new_line();
            // yep, regardless of visibility, we always export it
            w.writeln(format!("export function buildPayload_{} (", name));
            // write parameters
            write_parameters(&func.signature, w, c)?;
            // typeTags
            if num_tparams > 0 {
                w.writeln(format!("  $p: TypeTag[], /* <{}>*/", tpnames));
            }
            // marks returnType or void
            w.write(") ");
            // body:
            let params_no_signers = func
                .signature
                .parameters
                .iter()
                .filter(|(_n, ty)| !is_type_signer(ty))
                .collect::<Vec<_>>();

            w.short_block(|w| {
                let mident = c.current_module.unwrap();
                let address = format_address_hex(mident.value.address);
                if num_tparams > 0 {
                    w.writeln("const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));");
                } else {
                    w.writeln("const typeParamStrings = [] as string[];");
                }
                w.writeln("return $.buildPayload(");
                // function_name
                w.writeln(format!(
                    "  \"{}::{}::{}\",",
                    address, mident.value.module, name
                ));
                // type arguments
                w.writeln("  typeParamStrings,");
                // arguments
                if params_no_signers.is_empty() {
                    w.writeln("  []");
                } else {
                    w.writeln("  [");
                    for (pname, ptype) in params_no_signers.iter() {
                        w.writeln(format!(
                            "    {},",
                            get_ts_handler_for_script_function_param(pname, ptype)?,
                        ));
                    }
                    w.writeln("  ]");
                }
                w.writeln(");");
                Ok(())
            })?;
            w.new_line();
        }

        c.current_function_signature = None;

        Ok(())
    }
}

pub fn extract_builtin_type(ty: &Type) -> Result<(&BuiltinTypeName_, &Vec<Type>), bool> {
    if let Type_::Apply(_, typename, ty_args) = &ty.value {
        if let TypeName_::Builtin(builtin) = &typename.value {
            return Ok((&builtin.value, ty_args));
        }
    }
    Err(false)
}

pub fn get_ts_handler_for_script_function_param(name: &Var, ty: &Type) -> TermResult {
    let name = rename_keywords(name);
    if let Ok((builtin, ty_args)) = extract_builtin_type(ty) {
        match builtin {
            BuiltinTypeName_::Bool | BuiltinTypeName_::Address => Ok(name),
            BuiltinTypeName_::U8 | BuiltinTypeName_::U64 | BuiltinTypeName_::U128 => {
                Ok(format!("{}.toPayloadArg()", name))
            }
            BuiltinTypeName_::Signer => unreachable!(),
            BuiltinTypeName_::Vector => {
                // handle vector
                assert!(ty_args.len() == 1);
                if let Ok((inner_builtin, inner_ty_args)) = extract_builtin_type(&ty_args[0]) {
                    match inner_builtin {
                        BuiltinTypeName_::Bool | BuiltinTypeName_::Address => Ok(name),
                        BuiltinTypeName_::U8 | BuiltinTypeName_::U64 | BuiltinTypeName_::U128 => {
                            Ok(format!("{}.map(u => u.toPayloadArg())", name))
                        }
                        BuiltinTypeName_::Signer => unreachable!(),
                        BuiltinTypeName_::Vector => {
                            assert!(inner_ty_args.len() == 1);
                            let inner_map = get_ts_handler_for_vector_in_vector(&inner_ty_args[0])?;
                            Ok(format!("{}.map({})", name, inner_map))
                        }
                    }
                } else {
                    derr!((
                        ty.loc,
                        "This vector type is not supported as parameter of a script function"
                    ))
                }
            }
        }
    } else {
        derr!((
            ty.loc,
            "This type is not supported as parameter of script function"
        ))
    }
}

pub fn get_ts_handler_for_vector_in_vector(inner_ty: &Type) -> TermResult {
    if let Ok((builtin, inner_ty_args)) = extract_builtin_type(inner_ty) {
        match builtin {
            BuiltinTypeName_::Bool | BuiltinTypeName_::Address => {
                Ok("array => return array".to_string())
            }
            BuiltinTypeName_::U8 | BuiltinTypeName_::U64 | BuiltinTypeName_::U128 => {
                Ok("array => array.map(u => u.toPayloadArg())".to_string())
            }
            BuiltinTypeName_::Signer => unreachable!(),
            BuiltinTypeName_::Vector => {
                assert!(inner_ty_args.len() == 1);
                let inner_map = get_ts_handler_for_vector_in_vector(&inner_ty_args[0])?;
                Ok(format!("array => array.map({})", inner_map))
            }
        }
    } else {
        derr!((inner_ty.loc, "Unsupported vector-in-vector type"))
    }
}

pub fn is_type_signer(ty: &Type) -> bool {
    // includes signer or &signer
    if let Type_::Apply(_, typename, _) = &ty.value {
        if let TypeName_::Builtin(builtin_name) = &typename.value {
            builtin_name.value == BuiltinTypeName_::Signer
        } else {
            false
        }
    } else if let Type_::Ref(_, inner_ty) = &ty.value {
        is_type_signer(inner_ty)
    } else {
        false
    }
}

pub fn ts_constant_type(ty: &Type, c: &mut Context) -> TermResult {
    // only builtin types allowed as top-level constants
    match &ty.value {
        Type_::Apply(_, type_name, type_args) => match &type_name.value {
            TypeName_::Builtin(builtin_type_name) => match builtin_type_name.value {
                BuiltinTypeName_::Vector => {
                    Ok(format!("{}[]", ts_constant_type(&type_args[0], c)?))
                }
                _ => builtin_type_name.term(c),
            },
            _ => unreachable!("Only builtin types supported as constants"),
        },
        _ => unreachable!("Only builtin types supported as constants"),
    }
}

/*
4 types of If/Block
- non-returning (type is Unit)
- returning (end-of-function)
  - implicit return by value-yielding
  - explicit return
- lambda-wrapped expression
- ternary (only for IfElse)

how do we handle them systematically?

We start at function_body, whose last SequenceItem can be handled with is_returning = true
 */

pub fn write_if_else_possibly_return(
    cond: &Exp,
    t: &Exp,
    f: &Exp,
    w: &mut TsgenWriter,
    c: &mut Context,
) -> WriteResult {
    w.write(format!("if ({})", cond.term(c)?));
    match &t.exp.value {
        // returning (end-of-function)
        UnannotatedExp_::Block(tseq) => {
            write_seq_possibly_return(tseq, w, c)?;
        }
        _ => {
            if need_add_return(t, c)? {
                // lambda-wrapped / ternary
                w.write("return ");
                w.writeln(format!("{};", t.term(c)?));
            } else {
                t.write_ts(w, c)?;
                w.writeln(";");
            }
        }
    }
    w.write("else ");
    match &f.exp.value {
        UnannotatedExp_::Block(fseq) => {
            write_seq_possibly_return(fseq, w, c)?;
        }
        UnannotatedExp_::IfElse(fcond, ft, ff) => {
            write_if_else_possibly_return(fcond, ft, ff, w, c)?;
        }
        _ => {
            if need_add_return(f, c)? {
                w.write("return ");
                w.writeln(format!("{};", f.term(c)?));
            } else {
                t.write_ts(w, c)?;
                w.writeln(";");
            }
        }
    }

    Ok(())
}

pub fn write_last_si_possibly_return(
    last: &SequenceItem,
    w: &mut TsgenWriter,
    c: &mut Context,
) -> WriteResult {
    match &last.value {
        SequenceItem_::Seq(e) => {
            match &e.exp.value {
                UnannotatedExp_::Unit { trailing: _ } => {
                    w.writeln("return;");
                }
                UnannotatedExp_::Return(_e) => {
                    last.write_ts(w, c)?;
                }
                UnannotatedExp_::Abort(_e) => {
                    last.write_ts(w, c)?;
                }
                UnannotatedExp_::Break | UnannotatedExp_::Continue => {
                    return derr!((last.loc, "Cannot use break/continue to end a function"));
                }
                UnannotatedExp_::IfElse(cond, t, f) => {
                    write_if_else_possibly_return(cond, t, f, w, c)?;
                }
                UnannotatedExp_::While(_cond, _body) => {
                    // not gonna yield value
                    last.write_ts(w, c)?;
                }
                UnannotatedExp_::Loop {
                    has_break: _,
                    body: _,
                } => {
                    // not gonna yield value
                    last.write_ts(w, c)?;
                }
                UnannotatedExp_::Block(_body) => {
                    // could yield value
                    if need_add_return(e, c)? {
                        w.write("return ");
                    }
                    last.write_ts(w, c)?;
                }
                _ => {
                    // actually returning a value
                    w.write("return ");
                    last.write_ts(w, c)?;
                }
            }
        }
        SequenceItem_::Declare(_) => last.write_ts(w, c)?,
        SequenceItem_::Bind(_, _, _) => last.write_ts(w, c)?,
    }
    w.new_line();
    Ok(())
}

pub fn write_seq_possibly_return(
    seq: &Sequence,
    w: &mut TsgenWriter,
    c: &mut Context,
) -> WriteResult {
    /*
    - If the last SequenceItem yields a void, translate it to "return"
    - If the last SequenceItem yields a non-void Expr, translate it to "return e;"
     */
    w.writeln("{");
    w.increase_indent();
    if !seq.is_empty() {
        let last = &seq[seq.len() - 1];
        let mut cloned = seq.clone();
        let stmts = cloned.make_contiguous()[0..seq.len() - 1].to_vec();

        for stmt in stmts.iter() {
            stmt.write_ts(w, c)?;
            w.new_line();
        }

        // hanlde the last return
        write_last_si_possibly_return(last, w, c)?;
    }
    w.decrease_indent();
    w.writeln("}");

    Ok(())
}

impl AstTsPrinter for VecDeque<SequenceItem> {
    const CTOR_NAME: &'static str = "Sequence";
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        w.write("{");
        w.indent(2, |w| {
            w.list(self, "", |w, seq_item| {
                seq_item.write_ts(w, c)?;
                Ok(true)
            })?;
            Ok(())
        })?;
        w.write("}");

        Ok(())
    }
}

pub fn write_sequence_item(
    item: &SequenceItem,
    w: &mut TsgenWriter,
    c: &mut Context,
) -> WriteResult {
    use SequenceItem_ as I;
    match &item.value {
        I::Seq(e) => match &e.exp.value {
            UnannotatedExp_::IfElse(cond, t, f) => {
                w.writeln(format!("if ({}) ", cond.term(c)?));
                let need_curly = ifelse_need_curly(t);
                if need_curly {
                    w.writeln("{");
                }
                t.write_ts(w, c)?;
                if need_curly {
                    w.writeln("}");
                }
                match f.exp.value {
                    UnannotatedExp_::Unit { trailing: _ } => (),
                    _ => {
                        w.write("else ");
                        let need_curly = ifelse_need_curly(f);
                        if need_curly {
                            w.writeln("{");
                        }
                        f.write_ts(w, c)?;
                        if need_curly {
                            w.writeln("}");
                        }
                    }
                }
            }
            UnannotatedExp_::Block(body) => {
                // may yield value
                body.write_ts(w, c)?;
            }
            UnannotatedExp_::While(cond, body) => {
                // may not yield value
                w.writeln(format!("while ({}) ", cond.term(c)?));
                body.write_ts(w, c)?;
            }
            UnannotatedExp_::Loop { has_break: _, body } => {
                // may not yield value
                w.writeln("while (true) ");
                body.write_ts(w, c)?;
            }
            UnannotatedExp_::Unit { trailing: _ } => {
                // nop
            }
            _ => {
                w.write(e.term(c)?);
                w.write(";");
            }
        },
        I::Declare(lvalues) => {
            w.write("let ");
            lvalues.write_ts(w, c)?;
            w.write(";");
        }
        I::Bind(lvalues, _expected_types, e) => {
            if is_empty_lvalue_list(lvalues) {
                w.write(e.term(c)?);
            } else {
                w.write("let ");
                lvalues.write_ts(w, c)?;
                w.write(" = ");
                w.write(e.term(c)?);
            }
            w.write(";");
        }
    }

    Ok(())
}

impl AstTsPrinter for SequenceItem {
    const CTOR_NAME: &'static str = "SequenceItem";
    fn term(&self, c: &mut Context) -> TermResult {
        use SequenceItem_ as I;
        // some value-yielding Block can be formatted as lambdas, and need statements to be
        // presented in the form of ts_term
        match &self.value {
            I::Seq(e) => Ok(format!("{};", e.term(c)?)),
            I::Declare(lvalues) => Ok(format!("let {};", lvalues.term(c)?)),
            I::Bind(lvalues, _expected_types, e) => {
                /*
                There are two types of value-yielding statements:
                - lambda-needed
                - lambda not needed
                 */
                Ok(format!("let {} = {};", lvalues.term(c)?, e.term(c)?))
            }
        }
    }
    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        write_sequence_item(self, w, c)
    }
}
