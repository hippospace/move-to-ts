"use strict";

/** @type import('@typescript-eslint/utils').TSESLint.Linter.Config */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: __dirname + "/tsconfig.json",
  },
};
