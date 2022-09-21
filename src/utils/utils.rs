#[macro_use]
use crate::derr;
use crate::err::NotTranslatable;
use itertools::Itertools;
use std::fmt;
use clap::Parser;
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
use std::path::{Path, PathBuf};
use std::rc::Rc;
use move_command_line_common::address::NumericalAddress;
use crate::Context;
use crate::types::TermResult;


pub fn is_same_package(a1: Address, a2: Address) -> bool {
    match a1 {
        // Address eq implementation ignores name, but we cannot ignore that
        Address::Numerical(name, num) => match a2 {
            Address::Numerical(name2, num2) => {
                // FIXME temporary patch to get around aptos_framework namespacing error
                if num.value.eq(&NumericalAddress::parse_str("0x1").unwrap()) {
                    num == num2
                } else {
                    name == name2 && num == num2
                }
            }
            _ => false,
        },
        Address::NamedUnassigned(_) => a1 == a2,
    }
}

pub fn is_same_module(mi1: &ModuleIdent, mi2: &ModuleIdent) -> bool {
    mi1.value == mi2.value
}


pub fn quote(quoted: &impl fmt::Display) -> String {
    format!("\"{}\"", quoted)
}





pub fn format_address_(address: Address, use_stdlib: bool) -> String {
    // this one prefers Name if it exists
    match address {
        Address::Numerical(Some(name), addr) => {
            // FIXME: this is a temporary fix needed to address the wrongly quoted namespaces in
            // aptos_framework
            if use_stdlib && addr.value.eq(&NumericalAddress::parse_str("0x1").unwrap()) {
                "stdlib".to_string()
            } else {
                format!("{}", &name)
            }
        }
        Address::Numerical(None, numerical_address) => format!("X{}", &numerical_address),
        Address::NamedUnassigned(name) => format!("{}", &name),
    }
}

pub fn format_address(address: Address) -> String {
    format_address_(address, true)
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

pub fn write_file(root_path: &Path, pair: (String, String)) {
    let (filename, content) = pair;
    let path_to_save = root_path.join(filename);
    let parent = path_to_save.parent().unwrap();
    std::fs::create_dir_all(&parent).expect("Failed to create directory");
    std::fs::write(path_to_save, content).expect("Failed to write file to output");
}

pub fn format_function_name(fname: &impl fmt::Display, is_async: bool) -> String {
    let await_modifier = if is_async { "await " } else { "" };
    format!("{}{}_", await_modifier, fname)
}
pub fn format_qualified_payload_fname_and_import(
    mident: &ModuleIdent,
    name: &impl fmt::Display,
) -> (String, String) {
    // name exists in a different package, use fully qualified name
    let package_name = format_address(mident.value.address);
    (
        format!(
            "{}.{}.buildPayload_{}",
            capitalize(&package_name),
            capitalize(&mident.value.module),
            name
        ),
        package_name,
    )
}
pub fn base_type_to_typetag_builder_inner(
    base_ty: &BaseType,
    tparams: &Vec<StructTypeParameter>,
    c: &mut Context,
    use_simple_struct_tag: bool,
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
                    let inner_builder = base_type_to_typetag_builder_inner(
                        &ss[0],
                        tparams,
                        c,
                        use_simple_struct_tag,
                    )?;
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
                    comma_term(ss, c, |t, c| base_type_to_typetag_builder_inner(
                        t,
                        tparams,
                        c,
                        use_simple_struct_tag
                    ))?
                );
                if use_simple_struct_tag && c.is_current_module(mident) {
                    Ok(format!(
                        "new SimpleStructTag({}{})",
                        sname,
                        if tparams.len() == 2 {
                            "".to_string()
                        } else {
                            format!(", {}", tparams)
                        }
                    ))
                } else {
                    Ok(format!(
                        "new StructTag(new HexString({}), {}, {}, {})",
                        quote(&address),
                        quote(&modname),
                        quote(&sname),
                        tparams
                    ))
                }
            }
        },
        _ => derr!((base_ty.loc, "Received Unresolved Type")),
    }

}
pub fn base_type_to_typetag_builder(
    base_ty: &BaseType,
    tparams: &Vec<StructTypeParameter>,
    c: &mut Context,
) -> TermResult {
    base_type_to_typetag_builder_inner(base_ty, tparams, c, false)
}

pub fn stype_to_ts_parser(name: &String, loc: Loc, stype: &SingleType) -> TermResult {
    let base = match &stype.value {
        SingleType_::Base(b) => b,
        SingleType_::Ref(_, b) => b,
    };
    match &base.value {
        BaseType_::Param(_tparam) => {
            // FIXME
            derr!((
                loc,
                "Generic-typed arguments not supported at entry function invocation (yet)"
            ))
        }
        BaseType_::Apply(_, typename, targs) => match &typename.value {
            TypeName_::ModuleType(mi, sname) => {
                check_allowed_structs_for_entry_function(name, mi, sname, stype.loc)
            }
            TypeName_::Builtin(builtin) => match &builtin.value {
                BuiltinTypeName_::U8 => Ok(format!("u8({})", name)),
                BuiltinTypeName_::U64 => Ok(format!("u64({})", name)),
                BuiltinTypeName_::U128 => Ok(format!("u128({})", name)),
                BuiltinTypeName_::Bool => Ok(format!("{}=='true'", name)),
                BuiltinTypeName_::Address => Ok(format!("new HexString({})", name)),
                BuiltinTypeName_::Signer => unreachable!(),
                BuiltinTypeName_::Vector => {
                    assert!(targs.len() == 1);
                    vector_type_ts_parser(name, &targs[0])
                }
            },
        },
        _ => unreachable!(),
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
                if c.is_current_module(mident) {
                    Ok(format!(
                        "new SimpleStructTag({}{})",
                        sname,
                        if tparams.len() == 2 {
                            "".to_string()
                        } else {
                            format!(", {}", tparams)
                        }
                    ))
                } else {
                    Ok(format!(
                        "new StructTag(new HexString({}), {}, {}, {})",
                        quote(&address),
                        quote(&modname),
                        quote(sname),
                        tparams
                    ))
                }
            }
        },
        BaseType_::UnresolvedError => derr!((base_ty.loc, "Received Unresolved Type")),
        BaseType_::Unreachable => derr!((base_ty.loc, "Received Unresolved Type")),
    }
}

pub fn type_to_typetag(ty: &Type, c: &mut Context) -> TermResult {
    match &ty.value {
        Type_::Unit => derr!((ty.loc, "Cannot construct Unit types")),
        Type_::Single(single_ty) => match &single_ty.value {
            SingleType_::Ref(_, _) => derr!((ty.loc, "Cannot construct typetag for Ref types")),
            SingleType_::Base(base_ty) => base_type_to_typetag(base_ty, c),
        },
        Type_::Multiple(_) => derr!((ty.loc, "Cannot construct typeTag for tuples")),
    }
}

pub fn extract_attribute_value_string(attr: &Attribute) -> Option<String> {
    use move_compiler::expansion::ast::Value_ as EV;
    match &attr.value {
        Attribute_::Assigned(_, v) => match &v.value {
            AttributeValue_::Value(value) => match &value.value {
                EV::Bytearray(bytes) => {
                    let str_val =
                        String::from_utf8(bytes.clone()).unwrap_or_else(|_| String::from(""));
                    Some(str_val)
                }
                _ => None,
            },
            _ => None,
        },
        _ => None,
    }
}

pub fn is_typename_string(typename: &TypeName) -> bool {
    match &typename.value {
        TypeName_::ModuleType(mi, sname) => {
            let address = format_address_hex(mi.value.address);
            let short_name = format!("{}::{}::{}", address, mi.value.module, sname);
            short_name == "0x1::string::String"
        }
        _ => false,
    }
}

/*
1. Replace typescript keywords with WORD__
2. rename temporary variables
 */
pub fn rename(name: &impl fmt::Display) -> String {
    let name_str = format!("{}", name);
    match name_str.as_str() {
        "new" => "new__".to_string(),
        "default" => "default__".to_string(),
        "for" => "for__".to_string(),
        _ => {
            if name_str.starts_with("%#") {
                // replace temporaries
                format!("temp${}", name_str.split_at(2).1)
            } else if name_str.contains('#') {
                // normalize shadowed variable names
                name_str.replace('#', "__")
            } else {
                name_str
            }
        }
    }
}

pub fn capitalize(name: &impl fmt::Display) -> String {
    let name_str = format!("{}", name);
    let mut c = name_str.chars();
    match c.next() {
        None => String::new(),
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
    }
}


pub fn get_table_helper_decl() -> String {
    r###"
export class TypedTable<K=any, V=any> {
  static fromTable<K=any, V=any>(table: Table): TypedTable<K, V> {
    const tag = table.typeTag;
    if (!(tag instanceof StructTag)) {
      throw new Error();
    }
    if (tag.getParamlessName() !== '0x1::table::Table') {
      throw new Error();
    }
    if (tag.typeParams.length !== 2) {
      throw new Error();
    }
    const [keyTag, valueTag] = tag.typeParams;
    return new TypedTable<K, V>(table, keyTag, valueTag);
  }

  constructor(
    public table: Table,
    public keyTag: TypeTag,
    public valueTag: TypeTag
  ) {
  }

  async loadEntryRaw(client: AptosClient, key: K): Promise<any> {
    return await client.getTableItem(this.table.handle.toString(), {
      key_type: $.getTypeTagFullname(this.keyTag),
      value_type: $.getTypeTagFullname(this.valueTag),
      key: $.moveValueToOpenApiObject(key, this.keyTag),
    });
  }

  async loadEntry(client: AptosClient, repo: AptosParserRepo, key: K): Promise<V> {
    const rawVal = await this.loadEntryRaw(client, key);
    return repo.parse(rawVal, this.valueTag);
  }
}
"###
    .to_string()
}

pub fn get_iterable_table_helper_decl() -> String {
    r###"
export class TypedIterableTable<K=any, V=any> {
  static fromIterableTable<K=any, V=any>(table: IterableTable): TypedIterableTable<K, V> {
    const tag = table.typeTag;
    if (!(tag instanceof StructTag)) {
      throw new Error();
    }
    if (tag.getParamlessName() !== '0x1::iterable_table::IterableTable') {
      throw new Error();
    }
    if (tag.typeParams.length !== 2) {
      throw new Error();
    }
    const [keyTag, valueTag] = tag.typeParams;
    return new TypedIterableTable<K, V>(table, keyTag, valueTag);
  }

  iterValueTag: StructTag;
  constructor(
    public table: IterableTable,
    public keyTag: TypeTag,
    public valueTag: TypeTag
  ) {
    this.iterValueTag = new StructTag(moduleAddress, moduleName, "IterableValue", [keyTag, valueTag])
  }

  async loadEntryRaw(client: AptosClient, key: K): Promise<any> {
    return await client.getTableItem(this.table.inner.inner.handle.toString(), {
      key_type: $.getTypeTagFullname(this.keyTag),
      value_type: $.getTypeTagFullname(this.iterValueTag),
      key: $.moveValueToOpenApiObject(key, this.keyTag),
    });
  }

  async loadEntry(client: AptosClient, repo: AptosParserRepo, key: K): Promise<IterableValue> {
    const rawVal = await this.loadEntryRaw(client, key);
    return repo.parse(rawVal, this.iterValueTag) as IterableValue;
  }

  async fetchAll(client: AptosClient, repo: AptosParserRepo, cache: AptosLocalCache | null = null): Promise<[K, V][]> {
    const result: [K, V][] = [];
    const dummyCache = new $.DummyCache();
    let next = this.table.head;
    while(next && await Option.is_some_(next, dummyCache, [this.keyTag])) {
      const key = await Option.borrow_(next, dummyCache, [this.keyTag]) as K;
      const iterVal = await this.loadEntry(client, repo, key);
      const value = iterVal.val as V;
      result.push([key, value]);
      next = iterVal.next;
      if (cache) {
        const $p = [this.keyTag, this.valueTag];
        Table_with_length.add_(
          this.table.inner,
          $.copy(key),
          iterVal,
          cache,
          [$p[0], iterVal.typeTag]
        );
      }
    }
    return result;
  }
}
"###
        .to_string()
}
