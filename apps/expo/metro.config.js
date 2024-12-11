// Learn more: https://docs.expo.dev/guides/monorepos/
import { getDefaultConfig } from "expo/metro-config";
import { FileStore } from "metro-cache";
import { withNativeWind } from "nativewind/metro";

import { resolve, join } from "path";

const config = withTurborepoManagedCache(
  withMonorepoPaths(
    // eslint-disable-next-line no-undef
    withNativeWind(getDefaultConfig(__dirname), {
      input: "./src/styles.css",
      configPath: "./tailwind.config.ts",
    }),
  ),
);

// XXX: Resolve our exports in workspace packages
// https://github.com/expo/expo/issues/26926
config.resolver.unstable_enablePackageExports = true;

export default config;

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
  // eslint-disable-next-line no-undef
  const projectRoot = __dirname;
  const workspaceRoot = resolve(projectRoot, "../..");

  // #1 - Watch all files in the monorepo
  config.watchFolders = [workspaceRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    resolve(projectRoot, "node_modules"),
    resolve(workspaceRoot, "node_modules"),
  ];

  return config;
}

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [
    // eslint-disable-next-line no-undef
    new FileStore({ root: join(__dirname, ".cache/metro") }),
  ];
  return config;
}
