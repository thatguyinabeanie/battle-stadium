import {
  bigint,
  bigserial,
  foreignKey,
  index,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

import { matches } from "./matches";
import { players } from "./players";
import { profiles } from "./profiles";

export const matchGames = pgTable(
  "match_games",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    matchId: bigint("match_id", { mode: "bigint" }).notNull(),
    winnerId: bigint("winner_id", { mode: "bigint" }),
    loserId: bigint("loser_id", { mode: "bigint" }),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    gameNumber: integer("game_number").default(1).notNull(),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    startedAt: timestamp("started_at", { precision: 6, mode: "string" }),
    reporterProfileId: bigint("reporter_profile_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      indexMatchGamesOnLoserId: index("index_match_games_on_loser_id").using(
        "btree",
        table.loserId.asc().nullsLast(),
      ),
      indexMatchGamesOnMatchId: index("index_match_games_on_match_id").using(
        "btree",
        table.matchId.asc().nullsLast(),
      ),
      indexMatchGamesOnWinnerId: index("index_match_games_on_winner_id").using(
        "btree",
        table.winnerId.asc().nullsLast(),
      ),
      fkRails76Cefaebc0: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_76cefaebc0",
      }),
      fkRailsA2C90Fc36D: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_a2c90fc36d",
      }),
      fkRailsBe3D6Ef1Eb: foreignKey({
        columns: [table.winnerId],
        foreignColumns: [players.id],
        name: "fk_rails_be3d6ef1eb",
      }),
      fkRails8599A8B8Df: foreignKey({
        columns: [table.reporterProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_8599a8b8df",
      }),
    };
  },
);

export type MatchGame = typeof matchGames.$inferSelect;
export type MatchGameInsert = typeof matchGames.$inferInsert;
