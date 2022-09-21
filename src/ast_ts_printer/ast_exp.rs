use crate::shared::*;
use crate::derr;
use move_compiler::{
    diagnostics::Diagnostic,
    expansion::ast::ModuleAccess,
    hlir::ast::*,
    naming::ast::{BuiltinTypeName, BuiltinTypeName_, TParam},
    parser::ast::{BinOp, BinOp_, UnaryOp},
};
use move_ir_types::location::Loc;
use crate::ast_ts_printer::AstTsPrinter;
use crate::context::Context;
use crate::types::TermResult;
use crate::utils::utils::{base_type_to_typetag, format_function_name, quote, rename, ts_format_address_as_literal, ts_format_numerical_address, type_to_typetag};

impl AstTsPrinter for Exp {
    const CTOR_NAME: &'static str = "Exp";
    fn term(&self, c: &mut Context) -> TermResult {
        let Exp { ty: exp_ty, exp } = self;
        use UnannotatedExp_ as E;
        match &exp.value {
            E::Unit { case: _ } => {
                derr!((exp.loc, "Cannot output Unit as value"))
            }
            E::Value(v) => Ok(v.term(c)?),
            E::Move {
                annotation: _,
                var: v,
            } => Ok(rename(v)),
            E::Copy {
                from_user: _,
                var: v,
            } => {
                // value-types and immutables are copied by default
                let nocopy = rename(v);
                let explicit_copy = Ok(format!("$.copy({})", nocopy));
                match &exp_ty.value {
                    Type_::Single(single_ty) => match &single_ty.value {
                        SingleType_::Ref(_, _) => Ok(nocopy),
                        SingleType_::Base(base_ty) => match &base_ty.value {
                            BaseType_::Param(_) => explicit_copy,
                            BaseType_::Apply(_, typename, _) => match &typename.value {
                                TypeName_::Builtin(builtin) => match &builtin.value {
                                    // vector needs explicit copy
                                    BuiltinTypeName_::Vector => explicit_copy,
                                    BuiltinTypeName_::Bool => Ok(nocopy),
                                    // immutable types, address, signer do not need explicit copy
                                    //_ => Ok(nocopy),
                                    _ => explicit_copy,
                                },
                                TypeName_::ModuleType(_, _) => explicit_copy,
                            },
                            BaseType_::Unreachable => unreachable!(),
                            BaseType_::UnresolvedError => unreachable!(),
                        },
                    },
                    Type_::Unit => {
                        derr!((exp.loc, "Cannot copy Unit"))
                    }
                    Type_::Multiple(_) => explicit_copy,
                }
            }
            E::Constant(c) => Ok(format!("$.copy({})", rename(c))),
            E::ModuleCall(mcall) => {
                // ModuleCall
                Ok(mcall.term(c)?)
            }
            E::Builtin(bf, rhs) => {
                // BuiltinCall
                Ok((bf, rhs).term(c)?)
            }
            E::Vector(_, size, element_ty, elems) => {
                if *size == 0 {
                    // when size === 0, elems is Unit, which we do not support output as value
                    Ok(format!("[] as {}[]", base_type_to_tstype(element_ty, c)?))
                } else if *size == 1 {
                    Ok(format!("[{}]", elems.term(c)?))
                } else {
                    Ok(elems.term(c)?)
                }
            }
            E::Pack(s, _tys, fields) => {
                // ["Pack", "StructFullname", typeParams, fields]
                // construct a new struct/class value using proto constructor
                // constructor(proto: any, public typeTag: TypeTag)
                let inner_fields = comma_term(fields, c, |(fname, _, e), c| {
                    Ok(format!("{}: {}", fname, e.term(c)?))
                })?;
                let proto = format!("{{ {} }}", inner_fields);
                let tag = type_to_typetag(exp_ty, c)?;
                Ok(format!("new {}({}, {})", s, proto, tag))
            }
            E::ExpList(es) => {
                // FIXME: for now just output as [...]
                // FIXME: what is this, really?
                Ok(format!("[{}]", comma_term(es, c, |e, c| e.term(c))?))
            }
            E::Dereference(e) => {
                // dereference on RHS is copy, Dereference on LHS is handled in Mutate
                Ok(format!("$.copy({})", e.term(c)?))
            }
            E::UnaryExp(op, e) => {
                // only '!', which should just work
                Ok(format!("{}{}", op.term(c)?, e.term(c)?))
            }
            E::BinopExp(l, op, r) => {
                // op_u64(l, r)
                (l, op, r).term(c)
            }
            E::Borrow(_, e, f) => {
                if c.is_async() {
                    Ok(format!("({}).{}", e.term(c)?, rename(f)))
                } else {
                    Ok(format!("{}.{}", e.term(c)?, rename(f)))
                }
            }
            E::BorrowLocal(_, v) => {
                Ok(rename(v))
                //Ok(rename(v))
            }
            E::Cast(e, ty) => Ok(format!("{}({})", builtin_cast_name(ty, c)?, e.term(c)?)),
            E::Spec(_, _) => Ok("".to_string()),
            // FIXME: is this really how freeze should behave?
            E::Freeze(e) => e.term(c),
            E::UnresolvedError => {
                derr!((exp.loc, "Encountered UnresolvedError"))
            }
            E::Unreachable => unreachable!(),
        }
    }
}

pub fn format_type_args_at_instantiation(type_args: &Vec<BaseType>, c: &mut Context) -> TermResult {
    if type_args.is_empty() {
        return Ok("".to_string());
    }
    let inner = comma_term(type_args, c, base_type_to_typetag)?;
    Ok(format!(
        "[{}]{}",
        inner,
        if !inner.is_empty() {
            ""
        } else {
            " as TypeTag[]"
        }
    ))
}

impl AstTsPrinter for ModuleCall {
    const CTOR_NAME: &'static str = "ModuleCall";
    fn term(&self, c: &mut Context) -> TermResult {
        let ModuleCall {
            module,
            name,
            type_arguments,
            acquires: _,
            arguments, // Box<Exp>
        } = self;
        // ["Call", func, typeArgs, args]
        // func

        // every function signature will start with:
        // export function X($c: AptosDataCache, $p: TypeTag[], ...)
        let func_name = format_qualified_name(module, name, c);
        // AptosFramework::TypeInfo::type_of requires us to always send in the types parameters as
        // arguments as they are not always inferrable from regular parameters
        let tparams_ = format_type_args_at_instantiation(type_arguments, c)?;
        if arguments.ty.value == Type_::Unit {
            // no arguments
            if type_arguments.is_empty() {
                Ok(format!(
                    "{}($c)",
                    format_function_name(&func_name, c.is_async())
                ))
            } else {
                Ok(format!(
                    "{}($c, {})",
                    format_function_name(&func_name, c.is_async()),
                    tparams_
                ))
            }
        } else {
            // FIXME since args here is just Box<Exp>, we probably need to do some unwrapping here..
            let args = match &arguments.exp.value {
                UnannotatedExp_::ExpList(items) => comma_term(items, c, |item, c| item.term(c))?,
                _ => arguments.term(c)?,
            };
            Ok(format!(
                "{}({}, $c{}{})",
                format_function_name(&func_name, c.is_async()),
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
        let await_modifier = if c.is_async() { "await " } else { "" };
        let await_postfix = if c.is_async() { "_async" } else { "" };
        match &builtin_f.value {
            F::MoveTo(bt) => Ok(format!(
                "{}$c.move_to{}({}, {})",
                await_modifier,
                await_postfix,
                base_type_to_typetag(bt, c)?,
                args_str
            )),
            F::MoveFrom(bt) => Ok(format!(
                "{}$c.move_from{}<{}>({}, {})",
                await_modifier,
                await_postfix,
                base_type_to_tstype(bt, c)?,
                base_type_to_typetag(bt, c)?,
                args_str
            )),
            F::BorrowGlobal(true, bt) => Ok(format!(
                "{}$c.borrow_global_mut{}<{}>({}, {})",
                await_modifier,
                await_postfix,
                base_type_to_tstype(bt, c)?,
                base_type_to_typetag(bt, c)?,
                args_str
            )),
            F::BorrowGlobal(false, bt) => Ok(format!(
                "{}$c.borrow_global{}<{}>({}, {})",
                await_modifier,
                await_postfix,
                base_type_to_tstype(bt, c)?,
                base_type_to_typetag(bt, c)?,
                args_str
            )),
            F::Exists(bt) => Ok(format!(
                "{}$c.exists{}({}, {})",
                await_modifier,
                await_postfix,
                base_type_to_typetag(bt, c)?,
                args_str
            )),
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

pub fn base_type_to_tstype(base_ty: &BaseType, c: &mut Context) -> TermResult {
    match &base_ty.value {
        BaseType_::Param(tp) => {
            if c.current_function_signature.is_none() {
                // inside struct decl, where types params are translated to "any"
                return Ok("any".to_string());
            }
            // when TParam is used within a Type_, it is always used for instantiating a
            // concrete types or at a call site. So just use the hard-coded types-param: tparams_
            if let Some(idx) = c.get_tparam_index(tp) {
                Ok(format!("$p[{}]", idx))
            } else {
                unreachable!("Non-existent types parameter");
                //derr!((self.loc, "Non-existent types parameter"))
            }
        }
        BaseType_::Apply(_abilities_opt, m, ss) => {
            match &m.value {
                TypeName_::Builtin(builtin) => {
                    // usually we can output the builtin typename simply, but in the case of
                    // vector we also need to include the typeArg
                    if builtin.value == BuiltinTypeName_::Vector {
                        assert!(ss.len() == 1);
                        Ok(format!("{}[]", base_type_to_tstype(&ss[0], c)?))
                    } else {
                        builtin.term(c)
                    }
                }
                TypeName_::ModuleType(mi, s) => {
                    // in TS, do not include types args
                    Ok(format_qualified_name(mi, s, c))
                }
            }
        }
        _ => derr!((base_ty.loc, "Unresolved types")),
    }
}

pub fn single_type_to_tstype(ty: &SingleType, c: &mut Context) -> TermResult {
    match &ty.value {
        SingleType_::Ref(_, base_ty) => base_type_to_tstype(base_ty, c),
        SingleType_::Base(base_ty) => base_type_to_tstype(base_ty, c),
    }
}

pub fn type_to_tstype(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Unit => Ok("void".to_string()),
        Type_::Single(single_ty) => single_type_to_tstype(single_ty, c),
        Type_::Multiple(types) => Ok(format!(
            "[{}]",
            comma_term(types, c, single_type_to_tstype)?
        )),
    }
}

impl AstTsPrinter for Type {
    const CTOR_NAME: &'static str = "Type";
    fn term(&self, c: &mut Context) -> TermResult {
        // implement type_to_tstype
        match &self.value {
            Type_::Unit => Ok("void".to_string()),
            Type_::Single(single_ty) => single_type_to_tstype(single_ty, c),
            Type_::Multiple(ty_list) => Ok(format!(
                "[{}]",
                comma_term(ty_list, c, single_type_to_tstype)?
            )),
        }
    }
}

impl AstTsPrinter for Vec<Type> {
    const CTOR_NAME: &'static str = "TypeList";
    fn term(&self, c: &mut Context) -> TermResult {
        Ok(format!("[{}]", comma_term(self, c, type_to_tstype)?))
    }
}

impl AstTsPrinter for TypeName {
    const CTOR_NAME: &'static str = "TypeName";
    fn term(&self, c: &mut Context) -> TermResult {
        match &self.value {
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
                panic!("Should be handled elsewhere as here we do not have types param info");
            }
        }
    }
}

pub fn builtin_cast_name(builtin: &BuiltinTypeName, _c: &mut Context) -> TermResult {
    match builtin.value {
        BuiltinTypeName_::Address => derr!((builtin.loc, "Cannot cast to address")),
        BuiltinTypeName_::Bool => derr!((builtin.loc, "Cannot cast to bool")),
        BuiltinTypeName_::U8 => Ok("u8".to_string()),
        BuiltinTypeName_::U64 => Ok("u64".to_string()),
        BuiltinTypeName_::U128 => Ok("u128".to_string()),
        BuiltinTypeName_::Signer => derr!((builtin.loc, "Cannot cast to signer")),
        BuiltinTypeName_::Vector => derr!((builtin.loc, "Cannot cast to vector")),
    }
}

impl AstTsPrinter for Vec<LValue> {
    const CTOR_NAME: &'static str = "LValueList";
    fn term(&self, c: &mut Context) -> TermResult {
        let names = comma_term(self, c, |lv, c| lv.term(c))?;
        if self.len() == 1 {
            Ok(names)
        } else {
            Ok(format!("[{}]", names))
        }
    }
}

pub fn is_empty_lvalue_list(lvalues: &[LValue]) -> bool {
    if lvalues.is_empty() {
        true
    } else {
        lvalues.iter().all(is_empty_lvalue)
    }
}

pub fn is_empty_lvalue(lvalue: &LValue) -> bool {
    use LValue_ as L;
    match &lvalue.value {
        L::Ignore => true,
        L::Unpack(_, _, fields) => fields
            .iter()
            .all(|(_, as_lvalue)| is_empty_lvalue(as_lvalue)),
        _ => false,
    }
}

impl AstTsPrinter for LValue {
    const CTOR_NAME: &'static str = "LValue";
    fn term(&self, c: &mut Context) -> TermResult {
        use LValue_ as L;
        match &self.value {
            L::Ignore => Ok("".to_string()), // FIXME: this only works for array/tuple unpack!
            L::Var(v, _st) => Ok(rename(v)),
            L::Unpack(_, _, fields) => Ok(format!(
                "{{ {} }}",
                comma_term_opt(
                    fields,
                    c,
                    |(field, lvalue), c| {
                        let name = rename(&field);
                        let as_name = rename(&lvalue.term(c)?);
                        if as_name.is_empty() {
                            Ok("".to_string())
                        } else {
                            Ok(format!("{}: {}", name, as_name))
                        }
                    },
                    false
                )?
            )),
        }
    }
}

impl AstTsPrinter for TParam {
    /*
    TParam is used in
    - StructTypeParameter
    - concrete types instantiation (Call, ApplySingle)
     */
    const CTOR_NAME: &'static str = "TParam";
    fn term(&self, _c: &mut Context) -> TermResult {
        let TParam {
            id: _,
            user_specified_name,
            abilities: _,
        } = self;
        Ok(quote(user_specified_name))
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
    // however, require types-checked handling from runtime
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(format!("{}", self))
    }
}

pub fn dynamic_binop_name(op: BinOp_) -> &'static str {
    match op {
        BinOp_::Add => "$.dyn_add",
        BinOp_::Sub => "$.dyn_sub",
        BinOp_::Mul => "$.dyn_mul",
        BinOp_::Mod => "$.dyn_mod",
        BinOp_::Div => "$.dyn_div",
        BinOp_::BitOr => "$.dyn_bitor",
        BinOp_::BitAnd => "$.dyn_bitand",
        BinOp_::Xor => "$.dyn_xor",
        BinOp_::Shl => "$.dyn_shl",
        BinOp_::Shr => "$.dyn_shr",
        BinOp_::And => "$.dyn_and",
        BinOp_::Or => "$.dyn_or",
        BinOp_::Eq => "$.dyn_eq",
        BinOp_::Neq => "$.dyn_neq",
        BinOp_::Lt => "$.dyn_lt",
        BinOp_::Gt => "$.dyn_gt",
        BinOp_::Le => "$.dyn_le",
        BinOp_::Ge => "$.dyn_ge",
        _ => panic!("Unsupported binop: {}", op),
    }
}

pub fn handle_binop_for_base_type(
    ty: &BaseType, // usually types of lhs, but also inner types of Ref
    binop: &BinOp,
    lhs: &Exp,
    rhs: &Exp,
    c: &mut Context,
) -> TermResult {
    match &ty.value {
        BaseType_::Apply(_, type_name, _type_args) => {
            match &type_name.value {
                TypeName_::Builtin(builtin) => {
                    // XXX
                    match &builtin.value {
                        BuiltinTypeName_::Signer | BuiltinTypeName_::Address => {
                            let js_op = match &binop.value {
                                BinOp_::Eq => "===",
                                BinOp_::Neq => "!==",
                                _ => {
                                    return derr!((
                                        binop.loc,
                                        "Operation not supported on address/signer"
                                    ));
                                }
                            };
                            Ok(format!(
                                "(({}).hex() {} ({}).hex())",
                                lhs.term(c)?,
                                js_op,
                                rhs.term(c)?
                            ))
                        }
                        BuiltinTypeName_::Bool => {
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
                                BinOp_::Eq => {
                                    Ok(format!("({}).eq(({}))", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Neq => {
                                    Ok(format!("({}).neq({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Gt => {
                                    Ok(format!("({}).gt({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Lt => {
                                    Ok(format!("({}).lt({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Ge => {
                                    Ok(format!("({}).ge({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Le => {
                                    Ok(format!("({}).le({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::BitOr => {
                                    Ok(format!("({}).or({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::BitAnd => {
                                    Ok(format!("({}).and({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Xor => {
                                    Ok(format!("({}).xor({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Add => {
                                    Ok(format!("({}).add({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Sub => {
                                    Ok(format!("({}).sub({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Mul => {
                                    Ok(format!("({}).mul({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Div => {
                                    Ok(format!("({}).div({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Mod => {
                                    Ok(format!("({}).mod({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Shl => {
                                    Ok(format!("({}).shl({})", lhs.term(c)?, rhs.term(c)?))
                                }
                                BinOp_::Shr => {
                                    Ok(format!("({}).shr({})", lhs.term(c)?, rhs.term(c)?))
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
                            BinOp_::Eq => Ok(format!("$.veq({}, {})", lhs.term(c)?, rhs.term(c)?)),
                            BinOp_::Neq => {
                                Ok(format!("!$.veq({}, {})", lhs.term(c)?, rhs.term(c)?))
                            }
                            _ => derr!((
                                binop.loc,
                                format!("Vector does not have this binop: {}", binop)
                            )),
                        },
                    }
                }
                TypeName_::ModuleType(_mident, _s) => {
                    // struct only supports == or !=
                    match &binop.value {
                        BinOp_::Eq => Ok(format!("$.deep_eq({}, {})", lhs.term(c)?, rhs.term(c)?)),
                        BinOp_::Neq => {
                            Ok(format!("!$.deep_eq({}, {})", lhs.term(c)?, rhs.term(c)?))
                        }
                        _ => {
                            derr!((binop.loc, "Operation not supported on struct"))
                        }
                    }
                }
            }
        }
        BaseType_::Param(tp) => {
            let fname = dynamic_binop_name(binop.value);
            let tparams_ = format!("$p[{}]", c.get_tparam_index(tp).unwrap());
            Ok(format!(
                "{}({}, {}, {})",
                fname,
                tparams_,
                lhs.term(c)?,
                rhs.term(c)?
            ))
        }
        _ => panic!("Not sure how to handle binop for {}", lhs.ty.term(c)?),
    }
}

pub fn handle_binop_for_type(
    ty: &Type, // usually types of lhs, but also inner types of Ref
    binop: &BinOp,
    lhs: &Exp,
    rhs: &Exp,
    c: &mut Context,
) -> TermResult {
    match &ty.value {
        Type_::Unit => derr!((ty.loc, "Unit types has no supported binop")),
        Type_::Multiple(_) => derr!((ty.loc, "Tuple types has no supported binop")),
        Type_::Single(single_ty) => match &single_ty.value {
            SingleType_::Ref(_, ty) => match &binop.value {
                BinOp_::Eq | BinOp_::Neq => handle_binop_for_base_type(ty, binop, lhs, rhs, c),
                _ => panic!("Reftype does not have this binop: {}", binop),
            },
            SingleType_::Base(base_ty) => handle_binop_for_base_type(base_ty, binop, lhs, rhs, c),
        },
    }
}

impl AstTsPrinter for (&Box<Exp>, &BinOp, &Box<Exp>) {
    const CTOR_NAME: &'static str = "BinopExp";
    fn term(&self, c: &mut Context) -> TermResult {
        let (lhs, binop, rhs) = *self;
        handle_binop_for_type(&lhs.ty, binop, lhs, rhs, c)
    }
}

impl AstTsPrinter for UnaryOp {
    const CTOR_NAME: &'static str = "UnaryOp";
    fn term(&self, _c: &mut Context) -> TermResult {
        Ok(format!("{}", self))
    }
}

impl AstTsPrinter for ModuleAccess {
    const CTOR_NAME: &'static str = "ModuleAccess";
    fn term(&self, c: &mut Context) -> TermResult {
        use move_compiler::expansion::ast::ModuleAccess_ as MA;
        match &self.value {
            MA::Name(n) => Ok(format!("{}", n)),
            MA::ModuleAccess(m, n) => Ok(format_qualified_name(m, n, c)),
        }
    }
}

impl AstTsPrinter for Value {
    // Native Literals
    const CTOR_NAME: &'static str = "Value";
    fn term(&self, c: &mut Context) -> TermResult {
        use Value_ as V;
        match &self.value {
            V::Address(addr) => ts_format_numerical_address(addr),
            // FIXME bigInt needs types cast when assigned to U8/64/128?
            V::U8(u) => Ok(format!("u8(\"{}\")", u)),
            V::U64(u) => Ok(format!("u64(\"{}\")", u)),
            V::U128(u) => Ok(format!("u128(\"{}\")", u)),
            V::Bool(b) => Ok(format!("{}", b)),
            V::Vector(_, values) => {
                let mut vals = vec![];
                for val in values {
                    vals.push(val.term(c)?);
                }
                Ok(format!("[{}]", vals.join(", ")))
            }
        }
    }
}

// needed for AttributeValue
impl AstTsPrinter for move_compiler::expansion::ast::Value {
    // Native Literals
    const CTOR_NAME: &'static str = "Value";
    fn term(&self, _c: &mut Context) -> TermResult {
        use move_compiler::expansion::ast::Value_ as V;
        match &self.value {
            V::Address(addr) => ts_format_address_as_literal(addr, self.loc),
            // FIXME bigInt needs types cast when assigned to U8/64/128?
            V::InferredNum(u) => Ok(format!("bigInt(\"{}\")", u)),
            V::U8(u) => Ok(format!("u8(\"{}\")", u)),
            V::U64(u) => Ok(format!("u64(\"{}\")", u)),
            V::U128(u) => Ok(format!("u128(\"{}\")", u)),
            V::Bool(b) => Ok(format!("{}", b)),
            V::Bytearray(v) => {
                let mut vals = vec![];
                for val in v {
                    vals.push(format!("u8(\"{}\")", *val));
                }
                Ok(format!("[{}]", vals.join(", ")))
            }
        }
    }
}
