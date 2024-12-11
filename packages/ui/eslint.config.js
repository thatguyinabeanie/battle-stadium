import baseConfig from "@battle-stadium/eslint-config/base";
import reactConfig from "@battle-stadium/eslint-config/react";
import tseslint from "typescript-eslint";

/** @type {import('typescript-eslint').Config} */
export default tseslint.config(
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
);