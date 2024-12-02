import type { SQL } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export * from "drizzle-kit";
export * from "drizzle-orm";
export * from "drizzle-orm/sql";
export { alias } from "drizzle-orm/pg-core";
export * from "./client";

export function lower(column: AnyPgColumn): SQL {
  return sql`lower(${column})`;
}
