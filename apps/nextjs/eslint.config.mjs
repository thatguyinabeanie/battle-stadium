import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";
import nextjsConfig from "@battle-stadium/eslint-config/nextjs";
import reactConfig from "@battle-stadium/eslint-config/react";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: ["eslint:recommended", "plugin:@next/next/recommended"],
  }),

  {
    files: ["**/*.ts", "**/*.tsx"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
export default eslintConfig;
