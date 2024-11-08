import baseConfig, {
  restrictEnvAccess,
} from "@battle-stadium/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    files: ["src/**/*.ts", "env.ts"],
    ignores: [],
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
