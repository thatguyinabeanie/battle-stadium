import baseConfig from "@battle-stadium/eslint-config/base";
import restrictEnvAccess from "@battle-stadium/eslint-config/restrict-env-access";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    files: ["src/**/*.ts", "env.ts"],
    ignores: [],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
