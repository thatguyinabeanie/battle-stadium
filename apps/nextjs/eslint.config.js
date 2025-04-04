import nextPlugin from "@next/eslint-plugin-next";

import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";
import nextjsConfig from "@battle-stadium/eslint-config/nextjs";
import reactConfig from "@battle-stadium/eslint-config/react";

export default [
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
    settings: {
      next: {
        rootDir: "apps/nextjs",
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // TypeError: context.getAncestors is not a function
      "@next/next/no-duplicate-head": "off",
    },
  },
  // Order matters: base config first, then specialized configs
  ...baseConfig,
  // Make Next.js config load after React config to ensure proper rule precedence
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
