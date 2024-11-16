import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleNode } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../drizzle/schema";

type NeonClient = ReturnType<typeof neon>;
type PostgresClient = ReturnType<typeof postgres>;

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}
const isProd =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
const client = isProd
  ? neon(process.env.DATABASE_URL)
  : postgres(process.env.DATABASE_URL);

export const db = isProd
  ? drizzle({ client: client as NeonClient, schema, casing: "snake_case" })
  : drizzleNode(client as PostgresClient, { schema, casing: "snake_case" });

export * from "drizzle-orm";
