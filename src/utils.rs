use move_compiler::expansion::ast::ModuleIdent;
use std::fmt;

pub fn generate_package_json(package_name: String) -> (String, String) {
    let content = format!(
        r###"
{{
  "name": "{}",
  "version": "0.0.1",
  "scripts": {{
    "build": "rm -rf dist; tsc -p tsconfig.json",
    "test": "jest"
  }},
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": [ "src", "dist" ],
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
    "ts-jest": "^27.1.4",
    "typescript": "^4.6.4"
  }},
  "dependencies": {{
    "aptos": "^1.2.0",
    "big-integer": "^1.6.51",
    "@manahippo/move-to-ts": "^0.0.34"
  }}
}}
"###,
        package_name
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
  testPathIgnorePatterns: ["dist/*"],
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
            } else if name_str.contains("#") {
                // normalize shadowed variable names
                name_str.replace("#", "__")
            } else {
                name_str
            }
        }
    }
}

pub fn generate_index(package_name: &String, modules: &Vec<&ModuleIdent>) -> (String, String) {
    let filename = format!("{}/index.ts", package_name);
    let content = modules
        .iter()
        .map(|mi| {
            format!(
                "export * as {} from './{}';\n",
                mi.value.module, mi.value.module
            )
        })
        .collect::<Vec<_>>()
        .join("");
    (filename, content)
}

pub fn generate_topmost_index(packages: &Vec<&String>) -> (String, String) {
    let filename = "index.ts".to_string();
    let content = packages
        .iter()
        .map(|package_name| format!("export * as {} from './{}';\n", package_name, package_name))
        .collect::<Vec<_>>()
        .join("");
    (filename, content)
}
