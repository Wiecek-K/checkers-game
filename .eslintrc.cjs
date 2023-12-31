module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["autofix", "html", "@typescript-eslint"],
  rules: {
    "autofix/no-debugger": "error",
    "arrow-body-style": ["error", "as-needed"],
    "@typescript-eslint/no-explicit-any": ["warn"],
  },
};
