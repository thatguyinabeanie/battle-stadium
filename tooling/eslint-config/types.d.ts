/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module "eslint-plugin-import" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    all: { rules: Linter.RulesRecord };
    "jsx-runtime": { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: {
      rules: {
        "rules-of-hooks": Linter.RuleEntry;
        "exhaustive-deps": Linter.RuleEntry;
      };
    };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

declare module "@next/eslint-plugin-next" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: { rules: Linter.RulesRecord };
    "core-web-vitals": { rules: Linter.RulesRecord };
  };
  export const rules: Record<string, Rule.RuleModule>;
}

// types.d.ts
declare module "eslint-plugin-react-compiler" {
  import type { Rule } from "eslint";
  import type { FlatConfig } from 'eslint/config';  
  export const rules: Record<string, Rule.RuleModule>;
}

declare module '@battle-stadium/eslint-config/base' {
  const baseConfig: FlatConfig.Config[];  
  export default baseConfig;
}

declare module '@battle-stadium/eslint-config/nextjs' {
  const nextjsConfig: any[];
  export default nextjsConfig;
}

declare module '@battle-stadium/eslint-config/react' {
  const reactConfig: any[];
  export default reactConfig;
}

declare module '@battle-stadium/eslint-config/restrict-env-access' {
  import type { FlatConfig } from 'eslint/config';  
  export const restrictEnvAccess: FlatConfig.Config[];  
  export default restrictEnvAccess;
}