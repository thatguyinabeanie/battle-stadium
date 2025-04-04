import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

import baseConfig from "@battle-stadium/eslint-config/base";
// import nextjsConfig from "@battle-stadium/eslint-config/nextjs";
// import reactConfig from "@battle-stadium/eslint-config/react";
import restrictEnvAccess from "@battle-stadium/eslint-config/restrict-env-access";

// Set up proper directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const nextjsIntegration = compat.extends(
  "plugin:@next/next/recommended",
  "plugin:@next/next/core-web-vitals"

);

const eslintConfig = [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // Next.js specific rules
  ...nextjsIntegration,

  // Your monorepo's shared eslint configurations
  ...baseConfig,
  // ...reactConfig,
  // ...nextjsConfig,
  ...restrictEnvAccess,
];
export default eslintConfig;
