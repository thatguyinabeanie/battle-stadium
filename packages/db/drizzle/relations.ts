import { relations } from "drizzle-orm/relations";

import {
  accounts,
  chatMessages,
  clerkUsers,
  formats,
  games,
  matches,
  matchGames,
  organizations,
  organizationStaffMembers,
  phasePlayers,
  phases,
  players,
  pokemon,
  pokemonTeams,
  profiles,
  rounds,
  tournamentFormats,
  tournaments,
} from "./schema";

export const formatsRelations = relations(formats, ({ one, many }) => ({
  game: one(games, {
    fields: [formats.gameId],
    references: [games.id],
  }),
  tournamentFormats: many(tournamentFormats),
  pokemonTeams: many(pokemonTeams),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  formats: many(formats),
  tournaments: many(tournaments),
  pokemonTeams: many(pokemonTeams),
}));

export const organizationStaffMembersRelations = relations(
  organizationStaffMembers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationStaffMembers.organizationId],
      references: [organizations.id],
    }),
    account: one(accounts, {
      fields: [organizationStaffMembers.accountId],
      references: [accounts.id],
    }),
  }),
);

export const organizationsRelations = relations(
  organizations,
  ({ one, many }) => ({
    organizationStaffMembers: many(organizationStaffMembers),
    account: one(accounts, {
      fields: [organizations.ownerId],
      references: [accounts.id],
    }),
    tournaments: many(tournaments),
  }),
);

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  organizationStaffMembers: many(organizationStaffMembers),
  organizations: many(organizations),
  matches: many(matches),
  clerkUsers: many(clerkUsers),
  profile: one(profiles, {
    fields: [accounts.defaultProfileId],
    references: [profiles.id],
    relationName: "accounts_defaultProfileId_profiles_id",
  }),
  players: many(players),
  profiles: many(profiles, {
    relationName: "profiles_accountId_accounts_id",
  }),
  chatMessages: many(chatMessages),
}));

export const phasePlayersRelations = relations(phasePlayers, ({ one }) => ({
  player: one(players, {
    fields: [phasePlayers.playerId],
    references: [players.id],
  }),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
  phasePlayers: many(phasePlayers),
  matches_loserId: many(matches, {
    relationName: "matches_loserId_players_id",
  }),
  matches_playerOneId: many(matches, {
    relationName: "matches_playerOneId_players_id",
  }),
  matches_playerTwoId: many(matches, {
    relationName: "matches_playerTwoId_players_id",
  }),
  matches_winnerId: many(matches, {
    relationName: "matches_winnerId_players_id",
  }),
  matchGames_loserId: many(matchGames, {
    relationName: "matchGames_loserId_players_id",
  }),
  matchGames_winnerId: many(matchGames, {
    relationName: "matchGames_winnerId_players_id",
  }),
  pokemonTeam: one(pokemonTeams, {
    fields: [players.pokemonTeamId],
    references: [pokemonTeams.id],
  }),
  tournament: one(tournaments, {
    fields: [players.tournamentId],
    references: [tournaments.id],
  }),
  account: one(accounts, {
    fields: [players.accountId],
    references: [accounts.id],
  }),
  profile: one(profiles, {
    fields: [players.profileId],
    references: [profiles.id],
  }),
}));

export const phasesRelations = relations(phases, ({ one, many }) => ({
  tournament: one(tournaments, {
    fields: [phases.tournamentId],
    references: [tournaments.id],
    relationName: "phases_tournamentId_tournaments_id",
  }),
  round: one(rounds, {
    fields: [phases.currentRoundId],
    references: [rounds.id],
  }),
  matches: many(matches),
  tournaments: many(tournaments, {
    relationName: "tournaments_currentPhaseId_phases_id",
  }),
}));

export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
  phases: many(phases, {
    relationName: "phases_tournamentId_tournaments_id",
  }),
  matches: many(matches),
  tournamentFormats: many(tournamentFormats),
  game: one(games, {
    fields: [tournaments.gameId],
    references: [games.id],
  }),
  organization: one(organizations, {
    fields: [tournaments.organizationId],
    references: [organizations.id],
  }),
  phase: one(phases, {
    fields: [tournaments.currentPhaseId],
    references: [phases.id],
    relationName: "tournaments_currentPhaseId_phases_id",
  }),
  players: many(players),
}));

export const roundsRelations = relations(rounds, ({ many }) => ({
  phases: many(phases),
  matches: many(matches),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
  player_loserId: one(players, {
    fields: [matches.loserId],
    references: [players.id],
    relationName: "matches_loserId_players_id",
  }),
  player_playerOneId: one(players, {
    fields: [matches.playerOneId],
    references: [players.id],
    relationName: "matches_playerOneId_players_id",
  }),
  player_playerTwoId: one(players, {
    fields: [matches.playerTwoId],
    references: [players.id],
    relationName: "matches_playerTwoId_players_id",
  }),
  player_winnerId: one(players, {
    fields: [matches.winnerId],
    references: [players.id],
    relationName: "matches_winnerId_players_id",
  }),
  round: one(rounds, {
    fields: [matches.roundId],
    references: [rounds.id],
  }),
  tournament: one(tournaments, {
    fields: [matches.tournamentId],
    references: [tournaments.id],
  }),
  phase: one(phases, {
    fields: [matches.phaseId],
    references: [phases.id],
  }),
  account: one(accounts, {
    fields: [matches.resetById],
    references: [accounts.id],
  }),
  matchGames: many(matchGames),
  chatMessages: many(chatMessages),
}));

export const tournamentFormatsRelations = relations(
  tournamentFormats,
  ({ one }) => ({
    format: one(formats, {
      fields: [tournamentFormats.formatId],
      references: [formats.id],
    }),
    tournament: one(tournaments, {
      fields: [tournamentFormats.tournamentId],
      references: [tournaments.id],
    }),
  }),
);

export const pokemonRelations = relations(pokemon, ({ one }) => ({
  pokemonTeam: one(pokemonTeams, {
    fields: [pokemon.pokemonTeamId],
    references: [pokemonTeams.id],
  }),
}));

export const pokemonTeamsRelations = relations(
  pokemonTeams,
  ({ one, many }) => ({
    pokemon: many(pokemon),
    format: one(formats, {
      fields: [pokemonTeams.formatId],
      references: [formats.id],
    }),
    game: one(games, {
      fields: [pokemonTeams.gameId],
      references: [games.id],
    }),
    profile: one(profiles, {
      fields: [pokemonTeams.profileId],
      references: [profiles.id],
    }),
    players: many(players),
  }),
);

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  pokemonTeams: many(pokemonTeams),
  matchGames: many(matchGames),
  accounts: many(accounts, {
    relationName: "accounts_defaultProfileId_profiles_id",
  }),
  players: many(players),
  account: one(accounts, {
    fields: [profiles.accountId],
    references: [accounts.id],
    relationName: "profiles_accountId_accounts_id",
  }),
  chatMessages: many(chatMessages),
}));

export const matchGamesRelations = relations(matchGames, ({ one }) => ({
  match: one(matches, {
    fields: [matchGames.matchId],
    references: [matches.id],
  }),
  player_loserId: one(players, {
    fields: [matchGames.loserId],
    references: [players.id],
    relationName: "matchGames_loserId_players_id",
  }),
  player_winnerId: one(players, {
    fields: [matchGames.winnerId],
    references: [players.id],
    relationName: "matchGames_winnerId_players_id",
  }),
  profile: one(profiles, {
    fields: [matchGames.reporterProfileId],
    references: [profiles.id],
  }),
}));

export const clerkUsersRelations = relations(clerkUsers, ({ one }) => ({
  account: one(accounts, {
    fields: [clerkUsers.accountId],
    references: [accounts.id],
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  match: one(matches, {
    fields: [chatMessages.matchId],
    references: [matches.id],
  }),
  account: one(accounts, {
    fields: [chatMessages.accountId],
    references: [accounts.id],
  }),
  profile: one(profiles, {
    fields: [chatMessages.profileId],
    references: [profiles.id],
  }),
}));
