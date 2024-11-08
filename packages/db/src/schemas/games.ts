import { sql } from "drizzle-orm";
import {
  bigserial,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const games = pgTable(
  "games",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
  },
  (_table) => {
    return {
      indexGamesOnLowerName: uniqueIndex("index_games_on_lower_name").using(
        "btree",
        sql`lower((name)::text)`,
      ),
    };
  },
);
