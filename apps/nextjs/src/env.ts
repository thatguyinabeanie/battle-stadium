import { createEnv } from "@t3-oss/env-nextjs";
import { uploadthing, vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";

import { env as authEnv } from "@battle-stadium/auth/env";

export const env = createEnv({
  extends: [authEnv, vercel(), uploadthing()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    COOKIE_DOMAIN: z.string(),
    PROD_API_BASE_URL: z.string().url(),
    LOCAL_DEV_BACKEND_HOST: z.string().optional().default("localhost"),
    LOCAL_DEV_BACKEND_PORT: z.string().optional().default("10000"),
    DATABASE_URL: z.string().url().optional(),
    DATABASE_URL_UNPOOLED: z.string().url().optional(),
    WEBSOCKET_URL: z.string().optional(),
    MEASUREMENT_ID: z.string().default("G-XXXXXXXXXX"),
    UPLOADTHING_SECRET: z.string(),
    ROOT_URL: z
      .string()
      .url("ROOT_URL must be a valid URL")
      .optional()
      .default("http://localhost:10000"),
    DISCORD_APP_PUBLIC_KEY: z
      .string({
        required_error:
          "DISCORD_APP_PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> General information -> PUBLIC KEY",
      })
      .min(
        1,
        "DISCORD_APP_PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> General information -> PUBLIC KEY",
      )
      .optional(),
    DISCORD_APP_ID: z
      .string({
        required_error:
          "DISCORD_APP_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID",
      })
      .min(
        1,
        "DISCORD_APP_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID",
      )
      .optional(),
    SHOW_ADS: z.boolean().optional().default(false),
    LOG_PERFORMANCE: z.preprocess((val) => {
      if (val === undefined || val === null) return false;
      if (typeof val === "string" && val.toLowerCase() === "true") return true;
      return false;
    }, z.boolean()),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().optional().default("/sign-in"),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().optional().default("/sign-up"),
    NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID: z
      .string()
      .regex(/^ca-pub-[0-9]{16}$/, {
        message:
          "Invalid AdSense client ID format. Must start with 'ca-pub-' followed by 16 digits",
      })
      .describe("Google AdSense client ID (required for ad integration)")
      .optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
