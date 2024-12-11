import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";
import nextjsConfig from "@battle-stadium/eslint-config/nextjs";
import reactConfig from "@battle-stadium/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...restrictEnvAccess,
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
];
