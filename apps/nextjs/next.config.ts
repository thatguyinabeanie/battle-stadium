import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env.ts");

// To analyze bundle sizes, run with ANALYZE=true
// Example: ANALYZE=true pnpm build
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    authInterrupts: true,
    ppr: true,
    staleTimes: {
      dynamic: 5,
      static: 180,
    },
    typedRoutes: false,
    dynamicIO: false,
    staticGenerationRetryCount: 2,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
    turbo: {},
  },

  expireTime: 3600,

  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokepast.es",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "limitlesstcg.s3.us-east-2.amazonaws.com",
      },
    ],
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@battle-stadium/api",
    "@battle-stadium/auth",
    "@battle-stadium/db",
    "@battle-stadium/ui",
    "@battle-stadium/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
};

export default withBundleAnalyzer(nextConfig);
