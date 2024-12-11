/// <reference types="./types.d.ts" />

import tseslint from "typescript-eslint";

/**
 * All packages that leverage t3-env should use this rule
 */
export default tseslint.config(
  { ignores: ["**/env.ts", "next.config.*s", ".next/**", ".expo/**"] },
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "process",
          importNames: ["env"],
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
        },
      ],
    },
  },
);
