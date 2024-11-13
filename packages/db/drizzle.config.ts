import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

// Add BigInt serialization support
declare global {
  interface BigInt {
    toJSON (): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const nonPoolingUrl = process.env.DATABASE_URL.replace(":6543", ":5432");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  casing: "snake_case",
} satisfies Config);
