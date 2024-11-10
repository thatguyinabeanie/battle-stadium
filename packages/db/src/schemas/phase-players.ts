import {
  bigint,
  bigserial,
  foreignKey,
  index,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { players } from "./players";

export const phasePlayers = pgTable(
  "phase_players",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    playerId: bigint("player_id", { mode: "number" }).notNull(),
    phaseType: varchar("phase_type").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    phaseId: bigint("phase_id", { mode: "number" }).notNull(),
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
      indexPhasePlayersOnPlayerId: index(
        "index_phase_players_on_player_id",
      ).using("btree", table.playerId.asc().nullsLast()),
      indexTournamentPhasePlayersOnPhase: index(
        "index_tournament_phase_players_on_phase",
      ).using(
        "btree",
        table.phaseType.asc().nullsLast(),
        table.phaseId.asc().nullsLast(),
      ),
      fkRails71Fbe65D92: foreignKey({
        columns: [table.playerId],
        foreignColumns: [players.id],
        name: "fk_rails_71fbe65d92",
      }),
    };
  },
);

export type PhasePlayer = typeof phasePlayers.$inferSelect;
export type PhasePlayerInsert = typeof phasePlayers.$inferInsert;
