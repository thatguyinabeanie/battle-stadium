import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
// import  baseConfig from "./base.js";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').Config} */
export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "next.config.js"],
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
    plugins: {
      "@next/next": pluginNext,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@next/next/no-duplicate-head": "off",
    },
  },
);
