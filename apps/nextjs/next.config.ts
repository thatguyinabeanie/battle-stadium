import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env.ts");

const config: NextConfig = {
  reactStrictMode: true,

  experimental: {
    after: true,
    ppr: true,
    staleTimes: {
      dynamic: 5,
      static: 180,
    },
    dynamicIO: false,
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

  webpack: (config, { isServer }) => {
    if (!isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        // Get the entries but handle possible promise
        const entries = await (typeof originalEntry === "function"
          ? originalEntry()
          : Promise.resolve(originalEntry));

        // Handle different entry formats
        if (typeof entries === "string") {
          return ["./src/lib/polyfills/performance-now.ts", entries];
        }

        if (Array.isArray(entries)) {
          return ["./src/lib/polyfills/performance-now.ts", ...entries];
        }

        // Object format
        const mainEntry = entries.main || [];
        return {
          ...entries,
          main: Array.isArray(mainEntry)
            ? ["./src/lib/polyfills/performance-now.ts", ...mainEntry]
            : ["./src/lib/polyfills/performance-now.ts", mainEntry],
        };
      };
    }
    return config;
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
