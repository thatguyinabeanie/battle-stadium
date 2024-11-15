import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

function database_url() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === "production"
  ) {
    if (!process.env.DATABASE_URL_UNPOOLED) {
      throw new Error("Missing DATABASE_URL_UNPOOLED");
    }
    return process.env.DATABASE_URL_UNPOOLED;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
  }
  return process.env.DATABASE_URL;
}

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: database_url() },
  casing: "snake_case",
} satisfies Config);
