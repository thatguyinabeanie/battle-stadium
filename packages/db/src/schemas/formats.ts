import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { games } from "./games";

export const formats = pgTable(
  "formats",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    name: varchar(),
    gameId: bigint("game_id", { mode: "bigint" }),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return {
      indexFormatsOnGameId: index("index_formats_on_game_id").using(
        "btree",
        table.gameId.asc().nullsLast(),
      ),
      indexFormatsOnNameAndGameId: uniqueIndex(
        "index_formats_on_name_and_game_id",
      ).using(
        "btree",
        table.name.asc().nullsLast(),
        table.gameId.asc().nullsLast(),
      ),
      fkRailsA0E0605606: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_a0e0605606",
      }),
    };
  },
);

export type Format = typeof formats.$inferSelect;
export type FormatInsert = typeof formats.$inferInsert;
