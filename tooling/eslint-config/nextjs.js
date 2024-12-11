import nextPlugin from "@next/eslint-plugin-next";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    ignores: [".next/**"],
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-duplicate-head": "off",
    },
  },
];
