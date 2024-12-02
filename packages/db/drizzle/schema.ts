import type { ForeignKeyBuilder, IndexBuilder } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  boolean,
  date,
  foreignKey,
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export type {
  AnyPgColumn,
  ForeignKeyBuilder,
  IndexBuilder,
} from "drizzle-orm/pg-core";

export const schemaMigrations = pgTable("schema_migrations", {
  version: varchar().primaryKey().notNull(),
});

export const arInternalMetadata = pgTable("ar_internal_metadata", {
  key: varchar().primaryKey().notNull(),
  value: varchar(),
  createdAt: timestamp("created_at", {
    precision: 6,
    mode: "string",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    mode: "string",
  }).notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    email: varchar().notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    pronouns: varchar(),
    imageUrl: text("image_url"),
    admin: boolean().default(false).notNull(),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    defaultProfileId: integer("default_profile_id"),
    country: varchar(),
    timezone: varchar(),
  },
  (table) => {
    return {
      indexAccountsOnArchivedAt: index("index_accounts_on_archived_at").using(
        "btree",
        table.archivedAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexAccountsOnCreatedAt: index("index_accounts_on_created_at").using(
        "btree",
        table.createdAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexAccountsOnDefaultProfileId: uniqueIndex(
        "index_accounts_on_default_profile_id",
      ).using("btree", table.defaultProfileId.asc().nullsLast().op("int4_ops")),
      indexAccountsOnEmail: uniqueIndex("index_accounts_on_email").using(
        "btree",
        table.email.asc().nullsLast().op("text_ops"),
      ),
      fkRailsCee78B4B7D: foreignKey({
        columns: [table.defaultProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_cee78b4b7d",
      }),
    };
  },
);

export const games = pgTable(
  "games",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    name: varchar(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
  },
  (_table) => {
    return {
      indexGamesOnLowerName: uniqueIndex("index_games_on_lower_name").using(
        "btree",
        sql`lower((name)::text)`,
      ),
    };
  },
);

export const formats = pgTable(
  "formats",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    name: varchar(),
    gameId: integer("game_id"),
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
        table.gameId.asc().nullsLast().op("int4_ops"),
      ),
      indexFormatsOnNameAndGameId: uniqueIndex(
        "index_formats_on_name_and_game_id",
      ).using(
        "btree",
        table.name.asc().nullsLast().op("int4_ops"),
        table.gameId.asc().nullsLast().op("int4_ops"),
      ),
      fkRails810725A016: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_810725a016",
      }),
    };
  },
);

export const clerkUsers = pgTable(
  "clerk_users",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    clerkUserId: varchar("clerk_user_id").notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    accountId: integer("account_id"),
  },
  (table) => {
    return {
      indexClerkUsersOnAccountId: index(
        "index_clerk_users_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast().op("int4_ops")),
      indexClerkUsersOnAccountIdAndClerkUserId: uniqueIndex(
        "index_clerk_users_on_account_id_and_clerk_user_id",
      ).using(
        "btree",
        table.accountId.asc().nullsLast().op("text_ops"),
        table.clerkUserId.asc().nullsLast().op("text_ops"),
      ),
      indexClerkUsersOnClerkUserId: uniqueIndex(
        "index_clerk_users_on_clerk_user_id",
      ).using("btree", table.clerkUserId.asc().nullsLast().op("text_ops")),
      fkRails982E94E92D: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_982e94e92d",
      }),
    };
  },
);

export const matchGames = pgTable(
  "match_games",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    matchId: integer("match_id").notNull(),
    winnerId: integer("winner_id"),
    loserId: integer("loser_id"),
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
    reporterProfileId: integer("reporter_profile_id"),
  },
  (table) => {
    return {
      indexMatchGamesOnLoserId: index("index_match_games_on_loser_id").using(
        "btree",
        table.loserId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchGamesOnMatchId: index("index_match_games_on_match_id").using(
        "btree",
        table.matchId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchGamesOnWinnerId: index("index_match_games_on_winner_id").using(
        "btree",
        table.winnerId.asc().nullsLast().op("int4_ops"),
      ),
      fkRails541F829115: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_541f829115",
      }),
      fkRailsBe3D6Ef1Eb: foreignKey({
        columns: [table.winnerId],
        foreignColumns: [players.id],
        name: "fk_rails_be3d6ef1eb",
      }),
      fkRailsA2C90Fc36D: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_a2c90fc36d",
      }),
      fkRails8599A8B8Df: foreignKey({
        columns: [table.reporterProfileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_8599a8b8df",
      }),
    };
  },
);

export const friendlyIdSlugs = pgTable(
  "friendly_id_slugs",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    slug: varchar().notNull(),
    sluggableId: integer("sluggable_id").notNull(),
    sluggableType: varchar("sluggable_type", { length: 50 }),
    scope: varchar(),
    createdAt: timestamp("created_at", { precision: 6, mode: "string" }),
  },
  (table) => {
    return {
      indexFriendlyIdSlugsOnSlugAndSluggableType: index(
        "index_friendly_id_slugs_on_slug_and_sluggable_type",
      ).using(
        "btree",
        table.slug.asc().nullsLast().op("text_ops"),
        table.sluggableType.asc().nullsLast().op("text_ops"),
      ),
      indexFriendlyIdSlugsOnSlugAndSluggableTypeAndScope: uniqueIndex(
        "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope",
      ).using(
        "btree",
        table.slug.asc().nullsLast().op("text_ops"),
        table.sluggableType.asc().nullsLast().op("text_ops"),
        table.scope.asc().nullsLast().op("text_ops"),
      ),
      indexFriendlyIdSlugsOnSluggableTypeAndSluggableId: index(
        "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id",
      ).using(
        "btree",
        table.sluggableType.asc().nullsLast().op("int4_ops"),
        table.sluggableId.asc().nullsLast().op("text_ops"),
      ),
    };
  },
);

export const chatMessages = pgTable(
  "chat_messages",
  {
    matchId: integer("match_id").notNull(),
    content: text(),
    messageType: varchar("message_type"),
    sentAt: timestamp("sent_at", { precision: 6, mode: "string" }),
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    accountId: integer("account_id"),
    profileId: integer("profile_id").notNull(),
  },
  (table) => {
    return {
      indexChatMessagesOnAccountId: index(
        "index_chat_messages_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast().op("int4_ops")),
      indexChatMessagesOnMatchId: index(
        "index_chat_messages_on_match_id",
      ).using("btree", table.matchId.asc().nullsLast().op("int4_ops")),
      indexChatMessagesOnMatchIdAndAccountIdAndSentAt: index(
        "index_chat_messages_on_match_id_and_account_id_and_sent_at",
      ).using(
        "btree",
        table.matchId.asc().nullsLast().op("int4_ops"),
        table.accountId.asc().nullsLast().op("int4_ops"),
        table.sentAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexChatMessagesOnMatchIdAndProfileIdAndSentAt: index(
        "index_chat_messages_on_match_id_and_profile_id_and_sent_at",
      ).using(
        "btree",
        table.matchId.asc().nullsLast().op("timestamp_ops"),
        table.profileId.asc().nullsLast().op("int4_ops"),
        table.sentAt.asc().nullsLast().op("int4_ops"),
      ),
      fkRailsF9Ae4172Ee: foreignKey({
        columns: [table.matchId],
        foreignColumns: [matches.id],
        name: "fk_rails_f9ae4172ee",
      }),
      fkRails918Ef7Acc4: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_918ef7acc4",
      }),
      fkRailsF531Ed39E3: foreignKey({
        columns: [table.profileId],
        foreignColumns: [profiles.id],
        name: "fk_rails_f531ed39e3",
      }),
    };
  },
);

export const matches = pgTable(
  "matches",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    roundId: integer("round_id").notNull(),
    tableNumber: integer("table_number"),
    playerOneId: integer("player_one_id"),
    playerTwoId: integer("player_two_id"),
    winnerId: integer("winner_id"),
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
    }).default(sql`NULL`),
    playerTwoCheckIn: timestamp("player_two_check_in", {
      precision: 6,
      mode: "string",
    }).default(sql`NULL`),
    loserId: integer("loser_id"),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    tournamentId: integer("tournament_id"),
    phaseId: integer("phase_id"),
    bye: boolean().default(false).notNull(),
    resetById: integer("reset_by_id"),
  },
  (table) => {
    return {
      idxOnTournamentIdPhaseIdRoundIdTableNumber8Acf8Fd66A: index(
        "idx_on_tournament_id_phase_id_round_id_table_number_8acf8fd66a",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.phaseId.asc().nullsLast().op("int4_ops"),
        table.roundId.asc().nullsLast().op("int4_ops"),
        table.tableNumber.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchesOnLoserId: index("index_matches_on_loser_id").using(
        "btree",
        table.loserId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchesOnPhaseId: index("index_matches_on_phase_id").using(
        "btree",
        table.phaseId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchesOnPlayerOneId: index("index_matches_on_player_one_id").using(
        "btree",
        table.playerOneId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchesOnPlayerTwoId: index("index_matches_on_player_two_id").using(
        "btree",
        table.playerTwoId.asc().nullsLast().op("int4_ops"),
      ),
      indexMatchesOnTournamentIdAndCreatedAt: index(
        "index_matches_on_tournament_id_and_created_at",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("timestamp_ops"),
        table.createdAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexMatchesOnWinnerId: index("index_matches_on_winner_id").using(
        "btree",
        table.winnerId.asc().nullsLast().op("int4_ops"),
      ),
      fkRailsE7C0250650: foreignKey({
        columns: [table.roundId],
        foreignColumns: [rounds.id],
        name: "fk_rails_e7c0250650",
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
      fkRails973A5646Ac: foreignKey({
        columns: [table.loserId],
        foreignColumns: [players.id],
        name: "fk_rails_973a5646ac",
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

export const organizationStaffMembers = pgTable(
  "organization_staff_members",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    organizationId: integer("organization_id").notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    accountId: integer("account_id"),
  },
  (table) => {
    return {
      indexOrganizationStaffMembersOnAccountId: index(
        "index_organization_staff_members_on_account_id",
      ).using("btree", table.accountId.asc().nullsLast().op("int4_ops")),
      indexOrganizationStaffMembersOnOrganizationId: index(
        "index_organization_staff_members_on_organization_id",
      ).using("btree", table.organizationId.asc().nullsLast().op("int4_ops")),
      fkRails715Ab7F4Fe: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_715ab7f4fe",
      }),
      fkRails65Be078Ae6: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_65be078ae6",
      }),
    };
  },
);

export const organizations = pgTable(
  "organizations",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    name: varchar().notNull(),
    description: text(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    logoUrl: varchar("logo_url"),
    partner: boolean().default(false).notNull(),
    hidden: boolean().default(false).notNull(),
    slug: varchar(),
    limitlessOrgId: integer("limitless_org_id"),
    ownerId: integer("owner_id"),
  },
  (table) => {
    return {
      indexOrganizationsOnLowerName: uniqueIndex(
        "index_organizations_on_lower_name",
      ).using("btree", sql`lower((name)::text)`),
      indexOrganizationsOnLowerSlug: uniqueIndex(
        "index_organizations_on_lower_slug",
      ).using("btree", sql`lower((slug)::text)`),
      indexOrganizationsOnNameTrgm: index(
        "index_organizations_on_name_trgm",
      ).using("gin", table.name.asc().nullsLast().op("gin_trgm_ops")),
      indexOrganizationsOnOwnerId: index(
        "index_organizations_on_owner_id",
      ).using("btree", table.ownerId.asc().nullsLast().op("int4_ops")),
      indexOrganizationsOnPartner: index(
        "index_organizations_on_partner",
      ).using("btree", table.partner.asc().nullsLast().op("bool_ops")),
      indexOrganizationsOnSlugTrgm: index(
        "index_organizations_on_slug_trgm",
      ).using("gin", table.slug.asc().nullsLast().op("gin_trgm_ops")),
      fkRailsAb574863F6: foreignKey({
        columns: [table.ownerId],
        foreignColumns: [accounts.id],
        name: "fk_rails_ab574863f6",
      }),
    };
  },
);

export const phasePlayers = pgTable(
  "phase_players",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    playerId: integer("player_id").notNull(),
    phaseType: varchar("phase_type").notNull(),
    phaseId: integer("phase_id").notNull(),
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
      indexPhasePlayersOnPhaseIdAndPlayerId: index(
        "index_phase_players_on_phase_id_and_player_id",
      ).using(
        "btree",
        table.phaseId.asc().nullsLast().op("int4_ops"),
        table.playerId.asc().nullsLast().op("int4_ops"),
      ),
      fkRailsF772A83198: foreignKey({
        columns: [table.playerId],
        foreignColumns: [players.id],
        name: "fk_rails_f772a83198",
      }),
    };
  },
);

export const phases = pgTable(
  "phases",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    tournamentId: integer("tournament_id").notNull(),
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
    currentRoundId: integer("current_round_id"),
  },
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexPhasesOnTournamentIdAndOrder: index(
        "index_phases_on_tournament_id_and_order",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.order.asc().nullsLast().op("int4_ops"),
      ),
      indexPhasesOnType: index("index_phases_on_type").using(
        "btree",
        table.type.asc().nullsLast().op("text_ops"),
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

export const players = pgTable(
  "players",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    tournamentId: integer("tournament_id").notNull(),
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
    inGameName: varchar("in_game_name").notNull(),
    pokemonTeamId: integer("pokemon_team_id"),
    dropped: boolean().default(false).notNull(),
    disqualified: boolean().default(false).notNull(),
    roundWins: integer("round_wins").default(0).notNull(),
    roundLosses: integer("round_losses").default(0).notNull(),
    gameWins: integer("game_wins").default(0).notNull(),
    gameLosses: integer("game_losses").default(0).notNull(),
    resistance: numeric({ precision: 5, scale: 2 }),
    accountId: integer("account_id").notNull(),
    profileId: integer("profile_id").notNull(),
    showCountryFlag: boolean("show_country_flag").default(true).notNull(),
  },
  (table) => {
    return {
      indexPlayersOnAccountId: index("index_players_on_account_id").using(
        "btree",
        table.accountId.asc().nullsLast().op("int4_ops"),
      ),
      indexPlayersOnAccountIdAndCreatedAt: index(
        "index_players_on_account_id_and_created_at",
      ).using(
        "btree",
        table.accountId.asc().nullsLast().op("int4_ops"),
        table.createdAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexPlayersOnCheckedInAt: index("index_players_on_checked_in_at").using(
        "btree",
        table.checkedInAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexPlayersOnPokemonTeamId: index(
        "index_players_on_pokemon_team_id",
      ).using("btree", table.pokemonTeamId.asc().nullsLast().op("int4_ops")),
      indexPlayersOnProfileIdAndCreatedAt: index(
        "index_players_on_profile_id_and_created_at",
      ).using(
        "btree",
        table.profileId.asc().nullsLast().op("timestamp_ops"),
        table.createdAt.asc().nullsLast().op("int4_ops"),
      ),
      indexPlayersOnTournamentAndAccount: uniqueIndex(
        "index_players_on_tournament_and_account",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.accountId.asc().nullsLast().op("int4_ops"),
      ),
      indexPlayersOnTournamentId: index("index_players_on_tournament_id").using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
      ),
      indexPlayersOnTournamentIdAndCheckedInAt: index(
        "index_players_on_tournament_id_and_checked_in_at",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("timestamp_ops"),
        table.checkedInAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexPlayersOnTournamentIdAndDisqualified: index(
        "index_players_on_tournament_id_and_disqualified",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.disqualified.asc().nullsLast().op("bool_ops"),
      ),
      indexPlayersOnTournamentIdAndDropped: index(
        "index_players_on_tournament_id_and_dropped",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.dropped.asc().nullsLast().op("bool_ops"),
      ),
      indexPlayersOnTournamentIdAndRoundWins: index(
        "index_players_on_tournament_id_and_round_wins",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.roundWins.asc().nullsLast().op("int4_ops"),
      ),
      indexPlayersOnTournamentIdAndTeamSheetSubmitted: index(
        "index_players_on_tournament_id_and_team_sheet_submitted",
      ).using(
        "btree",
        table.tournamentId.asc().nullsLast().op("int4_ops"),
        table.teamSheetSubmitted.asc().nullsLast().op("bool_ops"),
      ),
      fkRails12F8141A7C: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_12f8141a7c",
      }),
      fkRailsAeec102047: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_aeec102047",
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

export const pokemon = pgTable(
  "pokemon",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
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
    pokemonTeamId: integer("pokemon_team_id").default(0).notNull(),
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
      indexPokemonOnPokemonTeamIdAndPosition: uniqueIndex(
        "index_pokemon_on_pokemon_team_id_and_position",
      ).using(
        "btree",
        table.pokemonTeamId.asc().nullsLast().op("int4_ops"),
        table.position.asc().nullsLast().op("int4_ops"),
      ),
      indexPokemonOnPokemonTeamIdAndSpecies: index(
        "index_pokemon_on_pokemon_team_id_and_species",
      ).using(
        "btree",
        table.pokemonTeamId.asc().nullsLast().op("int4_ops"),
        table.species.asc().nullsLast().op("int4_ops"),
      ),
      indexPokemonOnSpecies: index("index_pokemon_on_species").using(
        "btree",
        table.species.asc().nullsLast().op("text_ops"),
      ),
      fkRails5Fae4Aaee4: foreignKey({
        columns: [table.pokemonTeamId],
        foreignColumns: [pokemonTeams.id],
        name: "fk_rails_5fae4aaee4",
      }),
    };
  },
);

export const pokemonTeams = pgTable(
  "pokemon_teams",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
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
    formatId: integer("format_id").notNull(),
    gameId: integer("game_id").notNull(),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    pokepasteId: varchar("pokepaste_id"),
    profileId: integer("profile_id"),
  },
  (table) => {
    return {
      indexPokemonTeamsOnFormatIdAndCreatedAt: index(
        "index_pokemon_teams_on_format_id_and_created_at",
      ).using(
        "btree",
        table.formatId.asc().nullsLast().op("int4_ops"),
        table.createdAt.asc().nullsLast().op("int4_ops"),
      ),
      indexPokemonTeamsOnGameIdAndFormatIdAndCreatedAt: index(
        "index_pokemon_teams_on_game_id_and_format_id_and_created_at",
      ).using(
        "btree",
        table.gameId.asc().nullsLast().op("timestamp_ops"),
        table.formatId.asc().nullsLast().op("int4_ops"),
        table.createdAt.asc().nullsLast().op("int4_ops"),
      ),
      indexPokemonTeamsOnProfileIdAndArchivedAt: index(
        "index_pokemon_teams_on_profile_id_and_archived_at",
      ).using(
        "btree",
        table.profileId.asc().nullsLast().op("int4_ops"),
        table.archivedAt.asc().nullsLast().op("timestamp_ops"),
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

export const profiles = pgTable(
  "profiles",
  {
    username: varchar().notNull(),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    imageUrl: varchar("image_url"),
    slug: varchar(),
    archivedAt: timestamp("archived_at", { precision: 6, mode: "string" }),
    accountId: integer("account_id"),
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    default: boolean().default(false).notNull(),
    type: varchar().default("Profile").notNull(),
  },
  (table): Record<string, IndexBuilder | ForeignKeyBuilder> => {
    return {
      indexProfilesOnAccountId: index("index_profiles_on_account_id").using(
        "btree",
        table.accountId.asc().nullsLast().op("int4_ops"),
      ),
      indexProfilesOnSlug: uniqueIndex("index_profiles_on_slug").using(
        "btree",
        table.slug.asc().nullsLast().op("text_ops"),
      ),
      indexProfilesOnUsername: uniqueIndex("index_profiles_on_username").using(
        "btree",
        table.username.asc().nullsLast().op("text_ops"),
      ),
      fkRailsE424190865: foreignKey({
        columns: [table.accountId],
        foreignColumns: [accounts.id],
        name: "fk_rails_e424190865",
      }),
    };
  },
);

export const rk9Tournaments = pgTable(
  "rk9_tournaments",
  {
    id: serial().primaryKey().notNull(),
    rk9Id: varchar("rk9_id").notNull(),
    name: varchar().notNull(),
    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
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
      indexRk9TournamentsOnEndDate: index(
        "index_rk9_tournaments_on_end_date",
      ).using("btree", table.endDate.asc().nullsLast().op("date_ops")),
      indexRk9TournamentsOnName: uniqueIndex(
        "index_rk9_tournaments_on_name",
      ).using("btree", table.name.asc().nullsLast().op("text_ops")),
      indexRk9TournamentsOnRk9Id: uniqueIndex(
        "index_rk9_tournaments_on_rk9_id",
      ).using("btree", table.rk9Id.asc().nullsLast().op("text_ops")),
      indexRk9TournamentsOnStartAndEndDate: index(
        "index_rk9_tournaments_on_start_and_end_date",
      ).using(
        "btree",
        table.startDate.asc().nullsLast().op("date_ops"),
        table.endDate.asc().nullsLast().op("date_ops"),
      ),
      indexRk9TournamentsOnStartDate: index(
        "index_rk9_tournaments_on_start_date",
      ).using("btree", table.startDate.asc().nullsLast().op("date_ops")),
    };
  },
);

export const rounds = pgTable("rounds", {
  id: bigserial({ mode: "number" }).primaryKey().notNull(),
  phaseId: integer("phase_id").notNull(),
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
});

export const tournamentFormats = pgTable(
  "tournament_formats",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    tournamentId: integer("tournament_id").notNull(),
    formatId: integer("format_id").notNull(),
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
      ).using("btree", table.formatId.asc().nullsLast().op("int4_ops")),
      indexTournamentFormatsOnTournamentId: index(
        "index_tournament_formats_on_tournament_id",
      ).using("btree", table.tournamentId.asc().nullsLast().op("int4_ops")),
      fkRailsC679052Dc0: foreignKey({
        columns: [table.tournamentId],
        foreignColumns: [tournaments.id],
        name: "fk_rails_c679052dc0",
      }),
      fkRails08C15D3C37: foreignKey({
        columns: [table.formatId],
        foreignColumns: [formats.id],
        name: "fk_rails_08c15d3c37",
      }),
    };
  },
);

export const tournaments = pgTable(
  "tournaments",
  {
    id: bigserial({ mode: "number" }).primaryKey().notNull(),
    name: varchar(),
    startAt: timestamp("start_at", { precision: 6, mode: "string" }),
    createdAt: timestamp("created_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    updatedAt: timestamp("updated_at", {
      precision: 6,
      mode: "string",
    }).notNull(),
    organizationId: integer("organization_id"),
    checkInStartAt: timestamp("check_in_start_at", {
      precision: 6,
      mode: "string",
    }),
    gameId: integer("game_id"),
    formatId: integer("format_id"),
    endedAt: timestamp("ended_at", { precision: 6, mode: "string" }),
    registrationStartAt: timestamp("registration_start_at", {
      precision: 6,
      mode: "string",
    }),
    registrationEndAt: timestamp("registration_end_at", {
      precision: 6,
      mode: "string",
    }),
    playerCap: integer("player_cap"),
    autostart: boolean().default(false).notNull(),
    startedAt: timestamp("started_at", { precision: 6, mode: "string" }),
    lateRegistration: boolean("late_registration").default(true).notNull(),
    teamlistsRequired: boolean("teamlists_required").default(true).notNull(),
    openTeamSheets: boolean("open_team_sheets").default(true).notNull(),
    endAt: timestamp("end_at", { precision: 6, mode: "string" }).default(
      sql`NULL`,
    ),
    // You can use { mode: "number" } if numbers are exceeding js number limitations
    limitlessId: bigint("limitless_id", { mode: "number" }),
    published: boolean().default(false).notNull(),
    currentPhaseId: integer("current_phase_id"),
  },
  (table) => {
    return {
      indexTournamentsOnFormatIdAndStartAt: index(
        "index_tournaments_on_format_id_and_start_at",
      ).using(
        "btree",
        table.formatId.asc().nullsLast().op("int4_ops"),
        table.startAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexTournamentsOnGameIdAndStartAt: index(
        "index_tournaments_on_game_id_and_start_at",
      ).using(
        "btree",
        table.gameId.asc().nullsLast().op("timestamp_ops"),
        table.startAt.asc().nullsLast().op("int4_ops"),
      ),
      indexTournamentsOnLimitlessId: uniqueIndex(
        "index_tournaments_on_limitless_id",
      )
        .using("btree", table.limitlessId.asc().nullsLast().op("int8_ops"))
        .where(sql`(limitless_id IS NOT NULL)`),
      indexTournamentsOnOrganizationIdAndStartAt: index(
        "index_tournaments_on_organization_id_and_start_at",
      ).using(
        "btree",
        table.organizationId.asc().nullsLast().op("timestamp_ops"),
        table.startAt.asc().nullsLast().op("timestamp_ops"),
      ),
      indexTournamentsOnPublished: index(
        "index_tournaments_on_published",
      ).using("btree", table.published.asc().nullsLast().op("bool_ops")),
      indexTournamentsOnStartAt: index("index_tournaments_on_start_at").using(
        "btree",
        table.startAt.asc().nullsLast().op("timestamp_ops"),
      ),
      fkRails325Ccadea6: foreignKey({
        columns: [table.organizationId],
        foreignColumns: [organizations.id],
        name: "fk_rails_325ccadea6",
      }),
      fkRails8Ef7Ba6258: foreignKey({
        columns: [table.gameId],
        foreignColumns: [games.id],
        name: "fk_rails_8ef7ba6258",
      }),
      fkRails40Bc0Fb494: foreignKey({
        columns: [table.currentPhaseId],
        foreignColumns: [phases.id],
        name: "fk_rails_40bc0fb494",
      }),
    };
  },
);
