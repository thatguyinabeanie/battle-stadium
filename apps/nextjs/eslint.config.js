import nextPlugin from "@next/eslint-plugin-next";
import { FlatCompat } from "@eslint/eslintrc";

import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";
import nextjsConfig from "@battle-stadium/eslint-config/nextjs";
import reactConfig from "@battle-stadium/eslint-config/react";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  // Include Next.js config in a way that Next.js can detect
  ...compat.config({
    extends: ["next/core-web-vitals"],
    settings: {
      next: {
        rootDir: "apps/nextjs",
      },
    },
  }),
  {
    ignores: [".next/**"],
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@next/next/no-duplicate-head": "off", // TypeError: context.getAncestors is not a function
    },
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

