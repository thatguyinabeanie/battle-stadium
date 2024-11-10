import {
  bigint,
  bigserial,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const rounds = pgTable(
  "rounds",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    phaseId: bigint("phase_id", { mode: "bigint" }).notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    roundNumber: integer("round_number").default(1).notNull(),
    startedAt: timestamp("started_at", { precision: 6, mode: "string" }),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
  },
  (table) => {
    return {
      indexRoundsOnPhaseId: index("index_rounds_on_phase_id").using(
        "btree",
        table.phaseId.asc().nullsLast(),
      ),
      indexRoundsOnPhaseIdAndRoundNumber: uniqueIndex(
        "index_rounds_on_phase_id_and_round_number",
      ).using(
        "btree",
        table.phaseId.asc().nullsLast(),
        table.roundNumber.asc().nullsLast(),
      ),
    };
  },
);

export type Round = typeof rounds.$inferSelect;
export type RoundInsert = typeof rounds.$inferInsert;
