import path from "path";
import { fileURLToPath } from "url";
import nextPlugin from "@next/eslint-plugin-next";

import baseConfig from "@battle-stadium/eslint-config/base";
import restrictEnvAccess from "@battle-stadium/eslint-config/restrict-env-access";

// Set up proper directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eslintConfig = [
  ...baseConfig,
  ...restrictEnvAccess,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
    },
    settings: {
      next: {
        rootDir: __dirname,
      },
    },
  },
];

export default eslintConfig;
