import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "../drizzle/schema";

export const db = drizzle({
  client: sql,
  schema,
  casing: "snake_case",
});
