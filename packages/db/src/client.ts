import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleNode } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../drizzle/schema";

export * from "drizzle-orm";

function createClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
  }

  const isProd = process.env.NODE_ENV === "production";

  if (isProd) {
    return drizzle({
      client: neon(process.env.DATABASE_URL),
      schema,
      casing: "snake_case",
    });
  }

  return drizzleNode(postgres(process.env.DATABASE_URL), {
    schema,
    casing: "snake_case",
  });
}

export const db = createClient();
