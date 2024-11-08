import {
  bigint,
  bigserial,
  boolean,
  foreignKey,
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { accounts } from "./accounts";
import { pokemonTeams } from "./pokemon-teams";
import { profiles } from "./profiles";
import { tournaments } from "./tournaments";

export const players = pgTable(
  "players",
  {
    id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    tournamentId: bigint("tournament_id", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    teamSheetSubmitted: boolean("team_sheet_submitted")
      .default(false)
      .notNull(),
    checkedInAt: timestamp("checked_in_at", { mode: "string" }),
    inGameName: varchar("in_game_name").default("").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pokemonTeamId: bigint("pokemon_team_id", { mode: "number" }),
    dropped: boolean().default(false).notNull(),
    disqualified: boolean().default(false).notNull(),
    roundWins: integer("round_wins").default(0).notNull(),
    roundLosses: integer("round_losses").default(0).notNull(),
    gameWins: integer("game_wins").default(0).notNull(),
    gameLosses: integer("game_losses").default(0).notNull(),
    resistance: numeric({ precision: 5, scale: 2 }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    accountId: bigint("account_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    profileId: bigint("profile_id", { mode: "number" }).notNull(),
    showCountryFlag: boolean("show_country_flag").default(true).notNull(),
  },
  (table) => {
    return {
      indexPlayersOnAccountId: index("index_players_on_account_id").using(
        "btree",
        table.accountId.asc().nullsLast(),
      ),
      indexPlayersOnPokemonTeamId: index(
        "index_players_on_pokemon_team_id",
      ).using("btree", table.pokemonTeamId.asc().nullsLast()),
      indexPlayersOnTournamentId: index("index_players_on_tournament_id").using(
        "btree",
        table.tournamentId.asc().nullsLast(),
      ),
      fkRailsAeec102047: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_aeec102047",
      }),
      fkRailsF96Ec8A72F: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_f96ec8a72f",
      }),
      fkRails224Cac07Ce: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_224cac07ce",
      }),
      fkRailsC31Cf6Bf09: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_c31cf6bf09",
      }),
    };
  },
);
