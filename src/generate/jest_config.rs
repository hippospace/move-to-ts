pub fn generate() -> (String, String) {
    let content = r###"
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist/*", "aptos_framework/voting", "aptos_framework/stake", "aptos_std/signature", "aptos_framework/bucket_table"],
};
"###;
    ("jest.config.js".to_string(), content.to_string())
}