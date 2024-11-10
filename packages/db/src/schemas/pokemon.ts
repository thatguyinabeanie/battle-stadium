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
  varchar,
} from "drizzle-orm/pg-core";

import { pokemonTeams } from "./pokemon-teams";

export const pokemon = pgTable(
  "pokemon",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    species: varchar(),
    ability: varchar(),
    teraType: varchar("tera_type"),
    nature: varchar(),
    item: varchar(),
    move1: varchar(),
    move2: varchar(),
    move3: varchar(),
    move4: varchar(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    nickname: varchar(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pokemonTeamId: bigint("pokemon_team_id", { mode: "number" })
      .default(0)
      .notNull(),
    form: varchar(),
    position: integer().default(0).notNull(),
    gender: integer().default(2).notNull(),
    shiny: boolean().default(false).notNull(),
    evHp: integer("ev_hp"),
    evAtk: integer("ev_atk"),
    evDef: integer("ev_def"),
    evSpa: integer("ev_spa"),
    evSpd: integer("ev_spd"),
    evSpe: integer("ev_spe"),
    ivHp: integer("iv_hp"),
    ivAtk: integer("iv_atk"),
    ivDef: integer("iv_def"),
    ivSpa: integer("iv_spa"),
    ivSpd: integer("iv_spd"),
    ivSpe: integer("iv_spe"),
  },
  (table) => {
    return {
      indexPokemonOnPokemonTeamId: index(
        "index_pokemon_on_pokemon_team_id",
      ).using("btree", table.pokemonTeamId.asc().nullsLast()),
      indexPokemonOnPokemonTeamIdAndPosition: uniqueIndex(
        "index_pokemon_on_pokemon_team_id_and_position",
      ).using(
        "btree",
        table.pokemonTeamId.asc().nullsLast(),
        table.position.asc().nullsLast(),
      ),
      fkRails5B6022737B: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_5b6022737b",
      }),
    };
  },
);

export type Pokemon = typeof pokemon.$inferSelect;
export type PokemonInsert = typeof pokemon.$inferInsert;
