use crate::shared::*;
use crate::tsgen_writer::TsgenWriter;
use move_compiler::{
    diagnostics::{Diagnostic},
    naming::ast::{
        BuiltinTypeName, BuiltinTypeName_,
        TParam, Type, TypeName, TypeName_, Type_,
    },
    parser::ast::{
        BinOp, BinOp_, UnaryOp,
    },
    typing::ast::*,
};
use move_ir_types::location::Loc;

impl AstTsPrinter for UnannotatedExp {
    const CTOR_NAME: &'static str = "UnannotatedExp";
    // print all variants as non-statement expressions. I.e. for statement-only expressions
    // (while, loop, block) we'll panic, as that should have been handled by SequenceItem
    fn term(&self, c: &mut Context) -> TermResult {
        use UnannotatedExp_ as E;
        match &self.value {
            E::Unit { trailing: _ } => Ok("void".to_string()),
            E::Value(v) => Ok(v.term(c)?),
            E::Move {
                from_user: _,
                var: v,
            } => Ok(format!("{}", v)),
            E::Copy {
                from_user: _,
                var: v,
            } => Ok(format!("{}", v)),
            E::Use(v) => Ok(format!("{}", v)),
            E::Constant(None, c) => Ok(format!("{}", c)),
            E::Constant(Some(m), cc) => Ok(format_qualified_name(m, cc, c)),
            E::ModuleCall(mcall) => {
                // ModuleCall
                Ok(mcall.term(c)?)
            }
            E::Builtin(bf, rhs) => {
                // BuiltinCall
                Ok((bf, rhs).term(c)?)
            }
            E::Vector(_loc, _usize, _ty, elems) => Ok(elems.exp.term(c)?),
            E::Pack(m, s, tys, fields) => {
                // ["Pack", "StructFullname", typeParams, fields]
                // construct a new struct/class value using proto constructor
                // constructor(proto: any, public typeTag: TypeTag)
                let struct_name = format_qualified_name(m, s, c);
                let inner_fields =
                    comma_term(fields.key_cloned_iter(), c, |(fname, (_idx, field)), c| {
                        let (_ty, e) = field;
                        Ok(format!("{}: {}", fname, e.term(c)?))
                    })?;
                let proto = format!("{{ {} }}", inner_fields);
                let ty_args = format!("[{}]", comma_term(tys, c, |ty, c| type_to_typetag(ty, c))?);
                Ok(format!("new {}({}, {})", struct_name, proto, ty_args))
            }
            E::IfElse(b, t, f) => {
                // treat this as the ternary operator ? : and handle its statement case from
                // SequenceItem
                Ok(format!(
                    "({}) ? {} : {}",
                    b.term(c)?,
                    t.term(c)?,
                    f.term(c)?
                ))
            }
            E::While(_b, _e) => {
                derr!((self.loc, "While cannot be printed as ts term"))
            }
            E::Loop {
                has_break: _,
                body: _,
            } => {
                derr!((self.loc, "Loop cannot be printed as ts term"))
            }
            E::Block(seq) => {
                assert!(seq.len() > 0);
                let last = &seq[seq.len() - 1];
                if seq.len() == 1 {
                    if let SequenceItem_::Seq(e) = &last.value {
                        assert_ne!(e.ty.value, Type_::Unit, "Cannot print block as ts term");
                        e.term(c)
                    } else {
                        assert!(false);
                        derr!((self.loc, "Block cannot be printed as ts term"))
                    }
                } else {
                    let mut cloned = seq.clone();
                    let stmts = cloned.make_contiguous()[0..seq.len() - 1].to_vec();
                    let stmts_str = comma_term(&stmts, c, |si, c| si.term(c))?;
                    if let SequenceItem_::Seq(e) = &last.value {
                        if e.ty.value == Type_::Unit {
                            assert!(false);
                            return derr!((self.loc, "Block cannot be printed as ts term"));
                        }
                        let ret_val = e.term(c)?;
                        Ok(format!("(()=>{{ {} return {}; }})()", stmts_str, ret_val))
                    } else {
                        assert!(false);
                        derr!((self.loc, "Block cannot be printed as ts term"))
                    }
                }
            }
            E::ExpList(es) => {
                // FIXME: for now just output as [...]
                // FIXME: what is this, really?
                Ok(format!("[{}]", comma_term(es, c, |e, c| e.term(c))?))
            }

            // local mutation
            E::Assign(lvalues, _expected_types, rhs) => {
                /*
                There are two types of value-yielding statements:
                - lambda-needed
                - lambda not needed
                 */
                Ok(format!("{} = {}", lvalues.term(c)?, rhs.term(c)?))
            }

            // dereferencing mutation
            E::Mutate(lhs, rhs) => Ok(format!("{} = {}", lhs.term(c)?, rhs.term(c)?)),

            E::Return(e) => Ok(format!("return {}", e.term(c)?)),
            E::Abort(e) => Ok(format!("abort({})", e.term(c)?)),
            E::Break => Ok("break".to_string()),
            E::Continue => Ok("continue".to_string()),
            E::Dereference(e) => e.term(c),
            E::UnaryExp(op, e) => {
                // only '!', which should just work
                Ok(format!("{}{}", op.term(c)?, e.term(c)?))
            }
            E::BinopExp(l, op, ty, r) => {
                // op_u64(l, r)
                (l, op, ty, r).term(c)
            }
            E::Borrow(_mut_, e, f) => Ok(format!("{}.{}", e.term(c)?, f)),
            E::TempBorrow(_mut_, e) => e.term(c),
            E::BorrowLocal(_mut, v) => Ok(format!("{}", v)),
            E::Cast(e, ty) => {
                if let Type_::Apply(_, tname, _) = &ty.value {
                    if let TypeName_::Builtin(builtin) = &tname.value {
                        return Ok(format!("{}({})", builtin.term(c)?, e.term(c)?));
                    }
                }
                derr!((self.loc, "Cannot cast to non-builtin type"))
            }
            E::Annotate(_e, _ty) => {
                // FIXME
                derr!((self.loc, "Unable to handle  Annotate"))
                /*
                w.write("annot(");
                e.write_value(w);
                w.write(": ");
                ty.write_value(w);
                w.write(")");
                 */
            }
            E::Spec(_, _) => Ok("".to_string()),
            E::UnresolvedError => {
                derr!((self.loc, "Encountered UnresolvedError"))
            }
        }
    }
}

impl AstTsPrinter for Exp {
    const CTOR_NAME: &'static str = "Exp";
    fn term(&self, c: &mut Context) -> TermResult {
        let Exp { ty: _, exp } = self;
        exp.term(c)
    }

    fn write_ts(&self, w: &mut TsgenWriter, c: &mut Context) -> WriteResult {
        match &self.exp.value {
            UnannotatedExp_::IfElse(cond, t, f) => {
                w.writeln(format!("if ({}) ", cond.term(c)?));
                t.write_ts(w, c)?;
                match f.exp.value {
                    UnannotatedExp_::Unit { trailing: _ } => Ok(()),
                    _ => {
                        w.write(" else ");
                        f.write_ts(w, c)
                    }
                }
            }
            UnannotatedExp_::While(cond, body) => {
                w.writeln(format!("while ({}) ", cond.term(c)?));
                body.write_ts(w, c)
            }
            UnannotatedExp_::Loop { has_break: _, body } => {
                w.writeln("while (true) ");
                body.write_ts(w, c)
            }
            UnannotatedExp_::Block(body) => body.write_ts(w, c),
            _ => self.exp.write_ts(w, c),
        }
    }
}

pub fn format_type_args_at_instantiation(type_args: &Vec<Type>, c: &mut Context) -> TermResult {
    if type_args.len() == 0 {
        return Ok("".to_string());
    }
    let inner = comma_term(type_args, c, |t, c| type_to_typetag(t, c))?;
    Ok(format!("[{}]", inner))
}

impl AstTsPrinter for ModuleCall {
    const CTOR_NAME: &'static str = "ModuleCall";
    fn term(&self, c: &mut Context) -> TermResult {
        let ModuleCall {
            module,
            name,
            type_arguments,
            parameter_types: _,
            acquires: _,
            arguments, // Box<Exp>
        } = self;
        // ["Call", func, typeArgs, args]
        // func

        // every function signature will start with:
        // export function X($c: AptosDataCache, $p: TypeTag[], ...)
        let func_name = format_qualified_name(module, name, c);
        // AptosFramework::TypeInfo::type_of requires us to always send in the type parameters as
        // arguments as they are not always inferrable from regular parameters
        let tparams_ = format_type_args_at_instantiation(type_arguments, c)?;
        if arguments.ty.value == Type_::Unit {
            // no arguments
            if type_arguments.len() == 0 {
                Ok(format!("{}($c)", func_name))
            } else {
                Ok(format!("{}($c, {})", func_name, tparams_))
            }
        } else {
            // FIXME since args here is just Box<Exp>, we probably need to do some unwrapping here..
            let args = match &arguments.exp.value {
                UnannotatedExp_::ExpList(items) => comma_term(items, c, |item, c| item.term(c))?,
                _ => arguments.term(c)?,
            };
            Ok(format!(
                "{}({}, $c{}{})",
                func_name,
                args,
                if type_arguments.is_empty() { "" } else { ", " },
                tparams_, // may be ""
            ))
        }
    }
}

impl AstTsPrinter for (&Box<BuiltinFunction>, &Box<Exp>) {
    const CTOR_NAME: &'static str = "BuiltinCall";
    fn term(&self, c: &mut Context) -> TermResult {
        let (builtin_f, args) = *self;
        // FIXME since args here is just Box<Exp>, we probably need to do some unwrapping here..
        let args_str = if let UnannotatedExp_::ExpList(list) = &args.exp.value {
            comma_term(list, c, |item, c| item.term(c))?
        } else {
            args.term(c)?
        };
        use BuiltinFunction_ as F;
        match &builtin_f.value {
            F::MoveTo(bt) => Ok(format!("$move_to($c, {}, {})", bt.term(c)?, args_str)),
            F::MoveFrom(bt) => Ok(format!("$move_to($c, {}, {})", bt.term(c)?, args_str)),
            F::BorrowGlobal(true, bt) => Ok(format!(
                "$borrow_global_mut($c, {}, {})",
                bt.term(c)?,
                args_str
            )),
            F::BorrowGlobal(false, bt) => {
                Ok(format!("$borrow_global($c, {}, {})", bt.term(c)?, args_str))
            }
            F::Exists(bt) => Ok(format!("$exists($c, {}, {})", bt.term(c)?, args_str)),
            F::Freeze(bt) => Ok(format!("$freeze($c, {}, {})", bt.term(c)?, args_str)),
            F::Assert(_) => Ok(format!("$assert({})", args_str)),
        }
    }
}

impl AstTsPrinter for ExpListItem {
    const CTOR_NAME: &'static str = "ExpListItem";
    fn term(&self, c: &mut Context) -> TermResult {
        match self {
            ExpListItem::Single(e, _) => e.term(c),
            ExpListItem::Splat(_, _e, _ss) => {
                panic!("Splat not implemented");
            }
        }
    }
}

pub fn type_to_tstype(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Param(_tp) => Ok("any".to_string()),
        _ => ty.term(c),
    }
}

impl AstTsPrinter for Type {
    const CTOR_NAME: &'static str = "Type";
    fn term(&self, c: &mut Context) -> TermResult {
        match &self.value {
            Type_::Unit => Ok("void".to_string()),
            Type_::Ref(_mut, s) => type_to_tstype(s, c),
            Type_::Param(tp) => {
                // when TParam is used within a Type_, it is always used for instantiating a
                // concrete type or at a call site. So just use the hard-coded type-param: tparams_
                if let Some(idx) = c.get_tparam_index(tp) {
                    Ok(format!("$p[{}]", idx))
                } else {
                    assert!(false);
                    derr!((self.loc, "Non-existent type parameter"))
                }
            }
            Type_::Apply(_abilities_opt, m, ss) => {
                match &m.value {
                    TypeName_::Builtin(builtin) => {
                        // usually we can output the builtin typename simply, but in the case of
                        // vector we also need to include the typeArg
                        if builtin.value == BuiltinTypeName_::Vector {
                            assert!(ss.len() == 1);
                            Ok(format!("{}[]", type_to_tstype(&ss[0], c)?))
                        } else {
                            builtin.term(c)
                        }
                    }
                    TypeName_::ModuleType(mi, s) => {
                        // in TS, do not include type args
                        Ok(format_qualified_name(mi, s, c))
                    }
                    TypeName_::Multiple(_size) => ss.term(c),
                }
            }
            Type_::Var(_tv) => panic!("Received Type variable"), // w.write(&format!("#{}", tv.0)),
            Type_::Anything => Ok("any".to_string()),
            Type_::UnresolvedError => panic!("Received Unresolved Type"),
        }
    }
}

impl AstTsPrinter for Vec<Type> {
    const CTOR_NAME: &'static str = "TypeList";
    fn term(&self, c: &mut Context) -> TermResult {
        Ok(format!(
            "[{}]",
            comma_term(self, c, |t, c| type_to_tstype(t, c))?
        ))
    }
}

impl AstTsPrinter for TypeName {
    const CTOR_NAME: &'static str = "TypeName";
    fn term(&self, c: &mut Context) -> TermResult {
        match &self.value {
            // FIXME Multiple? is it just JS tuple [a,b,c]?
            TypeName_::Multiple(_len) => derr!((self.loc, "Not really sure what Multiple is")),
            TypeName_::Builtin(bt) => bt.term(c),
            TypeName_::ModuleType(m, s) => Ok(format_qualified_name(m, s, c)),
        }
    }
}

impl AstTsPrinter for BuiltinTypeName {
    const CTOR_NAME: &'static str = "BuiltinTypeName";
    fn term(&self, _c: &mut Context) -> TermResult {
        match &self.value {
            BuiltinTypeName_::Address => Ok("HexString".to_string()),
            BuiltinTypeName_::Bool => Ok("boolean".to_string()),
            BuiltinTypeName_::U8 => Ok("U8".to_string()),
            BuiltinTypeName_::U64 => Ok("U64".to_string()),
            BuiltinTypeName_::U128 => Ok("U128".to_string()),
            BuiltinTypeName_::Signer => Ok("HexString".to_string()),
            BuiltinTypeName_::Vector => {
                panic!("Should be handled elsewhere as here we do not have type param info");
            }
        }
    }
}

impl AstTsPrinter for LValueList {
    const CTOR_NAME: &'static str = "LValueList";
    fn term(&self, c: &mut Context) -> TermResult {
        let names = comma_term(&self.value, c, |lv, c| lv.term(c))?;
        if self.value.len() == 1 {
            Ok(names)
        } else {
            Ok(format!("[{}]", names))
        }
    }
}

impl AstTsPrinter for LValue {
    const CTOR_NAME: &'static str = "LValue";
    fn term(&self, c: &mut Context) -> TermResult {
        use LValue_ as L;
        match &self.value {
            L::Ignore => Ok("".to_string()), // FIXME: this only works for array/tuple unpack!
            L::Var(v, _st) => Ok(format!("{}", v)),
            L::Unpack(_, _, _, fields) => Ok(format!(
                "{{ {} }}",
                comma_term(fields.key_cloned_iter(), c, |kv, c| {
                    let name = kv.0;
                    let as_name = kv.1 .1 .1.term(c)?;
                    Ok(format!("{}: {}", name, as_name))
                })?
            )),
            L::BorrowUnpack(_, _, _, _, fields) => Ok(format!(
                "{{ {} }}",
                comma_term(fields.key_cloned_iter(), c, |kv, c| {
                    let name = kv.0;
                    let as_name = kv.1 .1 .1.term(c)?;
                    Ok(format!("{}: {}", name, as_name))
                })?
            )),
        }
    }
}

impl AstTsPrinter for TParam {
    /*
    TParam is used in
    - StructTypeParameter
    - concrete type instantiation (Call, ApplySingle)
     */
    const CTOR_NAME: &'static str = "TParam";
    fn term(&self, _c: &mut Context) -> TermResult {
        let TParam {
            id: _,
            user_specified_name,
            abilities: _,
        } = self;
        Ok(format!("{}", quote(user_specified_name)))
    }
}

impl AstTsPrinter for Vec<TParam> {
    const CTOR_NAME: &'static str = "TParamList";
    fn term(&self, c: &mut Context) -> TermResult {
        Ok(format!("[{}]", comma_term(self, c, |tp, c| tp.term(c))?))
    }
}

impl AstTsPrinter for BinOp {
    const CTOR_NAME: &'static str = "BinOp";
    // most of the binary ops can be directly used in TypeScript. Arithmetic & bitwise ones,
    // however, require type-checked handling from runtime
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(format!("{}", self))
    }
}

pub fn dynamic_binop_name(op: BinOp_) -> &'static str {
    match op {
        BinOp_::Add => "dyn_add",
        BinOp_::Sub => "dyn_sub",
        BinOp_::Mul => "dyn_mul",
        BinOp_::Mod => "dyn_mod",
        BinOp_::Div => "dyn_div",
        BinOp_::BitOr => "dyn_bitor",
        BinOp_::BitAnd => "dyn_bitand",
        BinOp_::Xor => "dyn_xor",
        BinOp_::Shl => "dyn_shl",
        BinOp_::Shr => "dyn_shr",
        BinOp_::And => "dyn_and",
        BinOp_::Or => "dyn_or",
        BinOp_::Eq => "dyn_eq",
        BinOp_::Neq => "dyn_neq",
        BinOp_::Lt => "dyn_lt",
        BinOp_::Gt => "dyn_gt",
        BinOp_::Le => "dyn_le",
        BinOp_::Ge => "dyn_ge",
        _ => panic!("Unsupported binop: {}", op),
    }
}

pub fn handle_binop_for_type(
    ty: &Type, // usually type of lhs, but also inner type of Ref
    binop: &BinOp,
    lhs: &Box<Exp>,
    rhs: &Box<Exp>,
    c: &mut Context,
) -> TermResult {
    match &ty.value {
        Type_::Apply(_, type_name, _type_args) => {
            match &type_name.value {
                TypeName_::Builtin(builtin) => {
                    // XXX
                    match &builtin.value {
                        BuiltinTypeName_::Signer
                        | BuiltinTypeName_::Address
                        | BuiltinTypeName_::Bool => {
                            // not precision-sensitive, and these operators are compatible
                            // with typescript
                            Ok(format!(
                                "({} {} {})",
                                lhs.term(c)?,
                                binop.term(c)?,
                                rhs.term(c)?,
                            ))
                        }
                        // precision-sensitive
                        BuiltinTypeName_::U8 | BuiltinTypeName_::U64 | BuiltinTypeName_::U128 => {
                            match binop.value {
                                // operate directly using bigInt since they cannot go wrong
                                BinOp_::Eq => Ok(format!("{}.eq({})", lhs.term(c)?, rhs.term(c)?)),
                                BinOp_::Neq => {
                                    Ok(format!("{}.neq({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Gt => Ok(format!("{}.gt({})", lhs.term(c)?, rhs.term(c)?)),
                                BinOp_::Lt => Ok(format!("{}.lt({})", lhs.term(c)?, rhs.term(c)?)),
                                BinOp_::Ge => Ok(format!("{}.ge({})", lhs.term(c)?, rhs.term(c)?)),
                                BinOp_::Le => Ok(format!("{}.le({})", lhs.term(c)?, rhs.term(c)?)),
                                BinOp_::BitOr => {
                                    Ok(format!("{}.or({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::BitAnd => {
                                    Ok(format!("{}.and({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Xor => {
                                    Ok(format!("{}.xor({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Add => {
                                    Ok(format!("{}.add({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Sub => {
                                    Ok(format!("{}.sub({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Mul => {
                                    Ok(format!("{}.mul({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Div => {
                                    Ok(format!("{}.div({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Mod => {
                                    Ok(format!("{}.mod({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Shl => {
                                    Ok(format!("{}.shl({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Shr => {
                                    Ok(format!("{}.shr({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                _ => {
                                    derr!((
                                        binop.loc,
                                        "Unsupported binary operation between unsigned integers"
                                    ))
                                }
                            }
                        }
                        BuiltinTypeName_::Vector => match binop.value {
                            BinOp_::Eq => Ok(format!("veq({}, {})", lhs.term(c)?, rhs.term(c)?)),
                            BinOp_::Neq => Ok(format!("vneq({}, {})", lhs.term(c)?, rhs.term(c)?)),
                            _ => derr!((
                                binop.loc,
                                format!("Vector does not have this binop: {}", binop)
                            )),
                        },
                    }
                }
                TypeName_::ModuleType(_mident, _s) => {
                    Ok(format!("deep_eq({}, {})", lhs.term(c)?, rhs.term(c)?))
                }
                _ => derr!((
                    binop.loc,
                    format!(
                        "Not sure how to handle binop ({}) for {}",
                        binop,
                        type_name.term(c)?
                    )
                )),
            }
        }
        Type_::Param(tp) => {
            let fname = dynamic_binop_name(binop.value);
            Ok(format!(
                "{}({}, {}, {})",
                fname,
                format!("$p[{}]", c.get_tparam_index(tp).unwrap()),
                lhs.term(c)?,
                rhs.term(c)?
            ))
        }
        Type_::Ref(_, ty) => match &binop.value {
            BinOp_::Eq | BinOp_::Neq => handle_binop_for_type(&ty, binop, lhs, rhs, c),
            _ => panic!("Reftype does not have this binop: {}", binop),
        },
        _ => panic!("Not sure how to handle binop for {}", lhs.ty.term(c)?),
    }
}

impl AstTsPrinter for (&Box<Exp>, &BinOp, &Box<Type>, &Box<Exp>) {
    const CTOR_NAME: &'static str = "BinopExp";
    fn term(&self, c: &mut Context) -> TermResult {
        let (lhs, binop, _ty, rhs) = *self;
        handle_binop_for_type(&lhs.ty, &binop, lhs, rhs, c)
    }
}

impl AstTsPrinter for UnaryOp {
    const CTOR_NAME: &'static str = "UnaryOp";
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(format!("{}", self))
    }
}
