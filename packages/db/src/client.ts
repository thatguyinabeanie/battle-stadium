import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleNode } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../drizzle/schema";

const isProd = process.env.NODE_ENV === "production";

// Production client (Neon)
const createProdClient = () => {
  if (!process.env.DATABASE_URL_UNPOOLED) {
    throw new Error("Missing DATABASE_URL_UNPOOLED");
  }
  console.log("creating prod client");
  const sql = neon(process.env.DATABASE_URL_UNPOOLED);
  return drizzle({
    client: sql,
    schema,
    casing: "snake_case",
  });
};

// Development client (Local Postgres)
const createDevClient = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
  }
  const client = postgres(process.env.DATABASE_URL);
  return drizzleNode(client, {
    schema,
  });
};

export const db = isProd ? createProdClient() : createDevClient();

export * from "drizzle-orm";
