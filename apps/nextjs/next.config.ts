import type { NextConfig } from "next";

import { fileURLToPath } from "url";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env.ts");

const config: NextConfig = {
  reactStrictMode: true,

  experimental: {
    // ppr: 'incremental',
    after: true,
    cssChunking: "loose", // default
    // how many times Next.js will retry failed page generation attempts
    // before failing the build
    staticGenerationRetryCount: 1,
    // how many pages will be processed per worker
    staticGenerationMaxConcurrency: 8,
    // the minimum number of pages before spinning up a new export worker
    staticGenerationMinPagesPerWorker: 25,
  },

  expireTime: 3600,

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
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },


};

export default config;
