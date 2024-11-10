import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

import { formats } from "./formats";
import { tournaments } from "./tournaments";

export const tournamentFormats = pgTable(
  "tournament_formats",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    tournamentId: bigint("tournament_id", { mode: "bigint" }).notNull(),
    formatId: bigint("format_id", { mode: "bigint" }).notNull(),
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
      indexTournamentFormatsOnFormatId: index(
        "index_tournament_formats_on_format_id",
      ).using("btree", table.formatId.asc().nullsLast()),
      indexTournamentFormatsOnTournamentId: index(
        "index_tournament_formats_on_tournament_id",
      ).using("btree", table.tournamentId.asc().nullsLast()),
      fkRails08C15D3C37: foreignKey({
        columns: [table.formatId],
        foreignColumns: [formats.id],
        name: "fk_rails_08c15d3c37",
      }),
      fkRailsC679052Dc0: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_c679052dc0",
      }),
    };
  },
);

export type TournamentFormat = typeof tournamentFormats.$inferSelect;
export type TournamentFormatInsert = typeof tournamentFormats.$inferInsert;
