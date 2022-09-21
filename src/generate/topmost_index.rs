use itertools::Itertools;

pub fn generate(packages: &[&String]) -> (String, String) {
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
import {{ AptosParserRepo, AptosLocalCache }} from "@manahippo/move-to-ts";
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
    this.cache = new AptosLocalCache();
{}
  }}
}}
"###,
        imports, exports, loads, app_fields, app_field_inits
    );

    (filename, content)
}
