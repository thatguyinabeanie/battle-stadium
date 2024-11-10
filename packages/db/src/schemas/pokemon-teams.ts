import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { formats } from "./formats";
import { games } from "./games";
import { profiles } from "./profiles";

export const pokemonTeams = pgTable(
  "pokemon_teams",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    published: boolean().default(true).notNull(),
    name: varchar(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    formatId: bigint("format_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    gameId: bigint("game_id", { mode: "number" }).notNull(),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    pokepasteId: varchar("pokepaste_id"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    profileId: bigint("profile_id", { mode: "number" }),
  },
  (table) => {
    return {
      indexPokemonTeamsOnFormatId: index(
        "index_pokemon_teams_on_format_id",
      ).using("btree", table.formatId.asc().nullsLast()),
      indexPokemonTeamsOnGameId: index("index_pokemon_teams_on_game_id").using(
        "btree",
        table.gameId.asc().nullsLast(),
      ),
      fkRails6E351688B8: foreignKey({
        columns: [table.formatId],
        foreignColumns: [formats.id],
        name: "fk_rails_6e351688b8",
      }),
      fkRailsE0513D6A9C: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_e0513d6a9c",
      }),
      fkRails7Bf8C65391: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_7bf8c65391",
      }),
    };
  },
);

export type PokemonTeam = typeof pokemonTeams.$inferSelect;
export type PokemonTeamInsert = typeof pokemonTeams.$inferInsert;
