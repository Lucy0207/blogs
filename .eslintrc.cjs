const path = require("path");
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "import",
    "prettier",
    "react",
    "react-hooks",
    "jsx-a11y",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": ["off"],
    "scss.lint.unknownAtRules": 0,
    indent: ["error", 2, { SwitchCase: 1 }],
    "prettier/prettier": "error",
    "linebreak-style": [0, "unix"],
    quotes: ["error", "double"],
    semi: 0,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "react/prefer-stateless-function": 2,
    "react/jsx-pascal-case": 2,
    "react/jsx-boolean-value": 2,
    "react/jsx-closing-bracket-location": 2,
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["CustomInputLabel"],
        labelAttributes: ["label"],
        controlComponents: ["CustomButton"],
        ignoreElements: ["button"],
        depth: 3,
      },
    ],
    "no-param-reassign": ["error", { props: false }],
    "import/no-unresolved": 2,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "no-plusplus": 0,
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [">", "}", '"', "}"],
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx",
        ".scss",
        ".svg",
        ".png",
        ".jpg",
      ],
    },
    "import/resolver": {
      typescript: {
        project: path.resolve("./tsconfig.json"),
      },
    },
    "import/external-module-folders": ["node_modules", "node_modules/@types"],
    react: {
      version: "detect",
    },
  },
};
