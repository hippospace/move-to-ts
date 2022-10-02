use itertools::Itertools;
use move_compiler::expansion::ast::ModuleIdent;
use std::fmt;

pub fn generate_package_json(package_name: String, cli: bool, ui: bool) -> (String, String) {
    let ui_dependencies = r###"
    "react": "^18.1.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-react": "^2.1.3",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
"###;
    let ui_scripts = r###"
    "ui:start": "react-scripts start",
    "ui:build": "react-scripts build",
    "ui:test": "react-scripts test",
    "ui:eject": "react-scripts eject",
"###;
    let ui_browser_list = r###"
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
"###;
    let cli_dependencies = r###"
    "commander": "^9.3.0",
    "yaml": "^2.1.1",
"###;
    let cli_script = r###"
    "cli": "node dist/cli.js",
"###;
    let content = format!(
        r###"
{{
  "name": "{}",
  "version": "0.0.1",
  "scripts": {{
    "build": "rm -rf dist; tsc -p tsconfig.json",{}{}
    "test": "jest"
  }},
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": [ "src", "dist" ],{}
  "devDependencies": {{
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.31",
    "@typescript-eslint/eslint-plugin": "^5.22.0",
    "@typescript-eslint/parser": "^5.22.0",
    "eslint": "^8.15.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^27.5.1",
    "prettier": "^2.6.2",
    "ts-jest": "^27.1.4",{}
    "typescript": "^4.6.4"
  }},
  "dependencies": {{
    "aptos": "1.3.14",
    "big-integer": "^1.6.51",{}
    "@manahippo/move-to-ts": "^0.3.8"
  }}
}}
"###,
        package_name,
        if ui { ui_scripts } else { "" },
        if cli { cli_script } else { "" },
        if ui { ui_browser_list } else { "" },
        if ui { ui_dependencies } else { "" },
        if cli { cli_dependencies } else { "" },
    );
    ("package.json".to_string(), content)
}

pub fn generate_ts_config() -> (String, String) {
    let content = r###"
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
"###;
    ("tsconfig.json".to_string(), content.to_string())
}

pub fn generate_jest_config() -> (String, String) {
    let content = r###"
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist/*", "aptos_framework/voting", "aptos_framework/stake", "aptos_std/signature", "aptos_framework/bucket_table"],
};
"###;
    ("jest.config.js".to_string(), content.to_string())
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

pub fn generate_index(package_name: &String, modules: &[&ModuleIdent]) -> (String, String) {
    let filename = format!("{}/index.ts", package_name);
    let exports = modules
        .iter()
        .map(|mi| {
            format!(
                "export * as {} from './{}';\n",
                capitalize(&mi.value.module),
                mi.value.module
            )
        })
        .collect::<Vec<_>>()
        .join("");

    let imports = modules
        .iter()
        .map(|mi| {
            format!(
                "import * as {} from './{}';\n",
                capitalize(&mi.value.module),
                mi.value.module
            )
        })
        .collect::<Vec<_>>()
        .join("");

    let loads = modules
        .iter()
        .map(|mi| format!("  {}.loadParsers(repo);", capitalize(&mi.value.module)))
        .join("\n");

    let app_fields = modules
        .iter()
        .map(|mi| {
            let cap_name = capitalize(&mi.value.module);
            format!("  {} : {}.App", mi.value.module, cap_name)
        })
        .join("\n");

    let app_field_inits = modules
        .iter()
        .map(|mi| {
            let cap_name = capitalize(&mi.value.module);
            format!(
                "    this.{} = new {}.App(client, repo, cache);",
                mi.value.module, cap_name
            )
        })
        .join("\n");

    let content = format!(
        r###"
import {{ AptosClient }} from "aptos";
import {{ AptosParserRepo, AptosLocalCache, AptosSyncedCache }} from "@manahippo/move-to-ts";
{}
{}

export function loadParsers(repo: AptosParserRepo) {{
{}
}}

export function getPackageRepo(): AptosParserRepo {{
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}}

export type AppType = {{
  client: AptosClient,
  repo: AptosParserRepo,
  cache: AptosLocalCache,
}};

export class App {{
{}
  constructor(
    public client: AptosClient,
    public repo: AptosParserRepo,
    public cache: AptosLocalCache,
  ) {{
{}
  }}
}}
"###,
        imports, exports, loads, app_fields, app_field_inits
    );

    (filename, content)
}

pub fn generate_topmost_index(packages: &[&String], is_async: bool) -> (String, String) {
    let filename = "index.ts".to_string();
    let exports = packages
        .iter()
        .map(|package_name| format!("export * as {} from './{}';\n", package_name, package_name))
        .collect::<Vec<_>>()
        .join("");

    let imports = packages
        .iter()
        .map(|package_name| format!("import * as {} from './{}';\n", package_name, package_name))
        .collect::<Vec<_>>()
        .join("");

    let loads = packages
        .iter()
        .map(|p| format!("  {}.loadParsers(repo);", p))
        .join("\n");

    let app_fields = packages
        .iter()
        .map(|p| format!("  {} : {}.App", p, p))
        .join("\n");

    let app_field_inits = packages
        .iter()
        .map(|p| {
            format!(
                "    this.{} = new {}.App(client, this.parserRepo, this.cache);",
                p, p
            )
        })
        .join("\n");

    let content = format!(
        r###"
import {{ AptosClient }} from "aptos";
import {{ AptosParserRepo, AptosLocalCache, AptosSyncedCache }} from "@manahippo/move-to-ts";
{}
{}

export function getProjectRepo(): AptosParserRepo {{
  const repo = new AptosParserRepo();
{}
  repo.addDefaultParsers();
  return repo;
}}

export class App {{
  parserRepo: AptosParserRepo;
  cache: AptosLocalCache;
{}
  constructor(
    public client: AptosClient,
  ) {{
    this.parserRepo = getProjectRepo();
    this.cache = new {}({});
{}
  }}
}}
"###,
        imports,
        exports,
        loads,
        app_fields,
        if is_async {"AptosSyncedCache"} else {"AptosLocalCache"},
        if is_async {"this.parserRepo, client"} else {""},
        app_field_inits
    );

    (filename, content)
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
