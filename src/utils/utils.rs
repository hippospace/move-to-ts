use itertools::Itertools;
use move_compiler::expansion::ast::ModuleIdent;
use std::fmt;
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
