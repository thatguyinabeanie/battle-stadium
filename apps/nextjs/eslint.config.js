import nextPlugin from "@next/eslint-plugin-next";

import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";
import reactConfig from "@battle-stadium/eslint-config/react";

// import nextjsConfig from "@battle-stadium/eslint-config/nextjs";

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
      // TypeError: context.getAncestors is not a function
      "@next/next/no-duplicate-head": "off",
    },
  },
  ...baseConfig,
  ...reactConfig,
  ...restrictEnvAccess,
];
