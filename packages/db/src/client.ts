import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schemas";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}
const sql = neon(process.env.POSTGRES_URL);

export const db = drizzle({
  client: sql,
  schema,
  casing: "snake_case",
});

export * from "drizzle-orm";
