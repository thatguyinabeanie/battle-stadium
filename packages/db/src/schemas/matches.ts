import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { phases } from "./phases";
import { players } from "./players";
import { rounds } from "./rounds";
import { tournaments } from "./tournaments";

export const matches = pgTable(
  "matches",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    roundId: bigint("round_id", { mode: "number" }).notNull(),
    tableNumber: integer("table_number"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    playerOneId: bigint("player_one_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    playerTwoId: bigint("player_two_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    winnerId: bigint("winner_id", { mode: "number" }),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    playerOneCheckIn: timestamp("player_one_check_in", {
      precision: 6,
      mode: "string",
    }),
    playerTwoCheckIn: timestamp("player_two_check_in", {
      precision: 6,
      mode: "string",
    }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    loserId: bigint("loser_id", { mode: "number" }),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tournamentId: bigint("tournament_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    phaseId: bigint("phase_id", { mode: "number" }),
    bye: boolean().default(false).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    resetById: bigint("reset_by_id", { mode: "number" }),
  },
  (table) => {
    return {
      indexMatchesOnLoserId: index("index_matches_on_loser_id").using(
        "btree",
        table.loserId.asc().nullsLast(),
      ),
      indexMatchesOnPhaseId: index("index_matches_on_phase_id").using(
        "btree",
        table.phaseId.asc().nullsLast(),
      ),
      indexMatchesOnPlayerOneId: index("index_matches_on_player_one_id").using(
        "btree",
        table.playerOneId.asc().nullsLast(),
      ),
      indexMatchesOnPlayerTwoId: index("index_matches_on_player_two_id").using(
        "btree",
        table.playerTwoId.asc().nullsLast(),
      ),
      indexMatchesOnRoundAndPlayersUnique: uniqueIndex(
        "index_matches_on_round_and_players_unique",
      ).using(
        "btree",
        table.roundId.asc().nullsLast(),
        table.playerOneId.asc().nullsLast(),
        table.playerTwoId.asc().nullsLast(),
      ),
      indexMatchesOnTournamentId: index("index_matches_on_tournament_id").using(
        "btree",
        table.tournamentId.asc().nullsLast(),
      ),
      indexMatchesOnWinnerId: index("index_matches_on_winner_id").using(
        "btree",
        table.winnerId.asc().nullsLast(),
      ),
      fkRails973A5646Ac: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_973a5646ac",
      }),
      fkRailsBfcd6A3C9F: foreignKey({
        columns: [table.playerOneId],
        foreignColumns: [players.id],
        name: "fk_rails_bfcd6a3c9f",
      }),
      fkRailsB58C6C3513: foreignKey({
        columns: [table.playerTwoId],
        foreignColumns: [players.id],
        name: "fk_rails_b58c6c3513",
      }),
      fkRails9D0Deeb219: foreignKey({
        columns: [table.winnerId],
        foreignColumns: [players.id],
        name: "fk_rails_9d0deeb219",
      }),
      fkRailsE7C0250650: foreignKey({
        columns: [table.roundId],
        foreignColumns: [rounds.id],
        name: "fk_rails_e7c0250650",
      }),
      fkRails700Eaa2935: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_700eaa2935",
      }),
      fkRails36Efc9F0F5: foreignKey({
        columns: [table.phaseId],
        foreignColumns: [phases.id],
        name: "fk_rails_36efc9f0f5",
      }),
      fkRailsAf814604Cc: foreignKey({
        columns: [table.resetById],
        foreignColumns: [accounts.id],
        name: "fk_rails_af814604cc",
      }),
    };
  },
);

export type Match = typeof matches.$inferSelect;
export type MatchInsert = typeof matches.$inferInsert;
