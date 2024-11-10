import {
  bigint,
  bigserial,
  foreignKey,
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { rounds } from "./rounds";
import { tournaments } from "./tournaments";

export const phases = pgTable(
  "phases",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
    numberOfRounds: integer("number_of_rounds"),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    type: varchar().notNull(),
    name: varchar(),
    bestOf: integer("best_of").default(3).notNull(),
    startedAt: timestamp("started_at", { precision: 6, mode: "string" }),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    order: integer().default(0).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    currentRoundId: bigint("current_round_id", { mode: "number" }),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (table): Record<string, any> => {
    return {
      indexPhasesOnCurrentRoundId: index(
        "index_phases_on_current_round_id",
      ).using("btree", table.currentRoundId.asc().nullsLast()),
      indexPhasesOnTournamentId: index("index_phases_on_tournament_id").using(
        "btree",
        table.tournamentId.asc().nullsLast(),
      ),
      indexPhasesOnType: index("index_phases_on_type").using(
        "btree",
        table.type.asc().nullsLast(),
      ),
      fkRails75E775589E: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_75e775589e",
      }),
      fkRails2909E41898: foreignKey({
        columns: [table.currentRoundId],
        foreignColumns: [rounds.id],
        name: "fk_rails_2909e41898",
      }),
    };
  },
);

export type Phase = typeof phases.$inferSelect;
export type PhaseInsert = typeof phases.$inferInsert;
