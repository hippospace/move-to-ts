pub fn generate(package_name: String, cli: bool, ui: bool) -> (String, String) {
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
    "aptos": "1.3.12",
    "big-integer": "^1.6.51",{}
    "@manahippo/move-to-ts": "^0.2.18"
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

