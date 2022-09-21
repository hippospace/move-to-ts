use itertools::Itertools;
use move_compiler::expansion::ast::ModuleIdent;
use crate::utils::utils::capitalize;

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
import {{ AptosParserRepo, AptosLocalCache }} from "@manahippo/move-to-ts";
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

export types AppType = {{
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
