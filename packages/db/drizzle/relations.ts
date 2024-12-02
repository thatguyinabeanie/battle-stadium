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

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [accounts.defaultProfileId],
    references: [profiles.id],
    relationName: "accounts_defaultProfileId_profiles_id",
  }),
  clerkUsers: many(clerkUsers),
  chatMessages: many(chatMessages),
  matches: many(matches),
  organizationStaffMembers: many(organizationStaffMembers),
  organizations: many(organizations),
  players: many(players),
  profiles: many(profiles, {
    relationName: "profiles_accountId_accounts_id",
  }),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  accounts: many(accounts, {
    relationName: "accounts_defaultProfileId_profiles_id",
  }),
  matchGames: many(matchGames),
  chatMessages: many(chatMessages),
  players: many(players),
  pokemonTeams: many(pokemonTeams),
  account: one(accounts, {
    fields: [profiles.accountId],
    references: [accounts.id],
    relationName: "profiles_accountId_accounts_id",
  }),
}));

export const formatsRelations = relations(formats, ({ one, many }) => ({
  game: one(games, {
    fields: [formats.gameId],
    references: [games.id],
  }),
  pokemonTeams: many(pokemonTeams),
  tournamentFormats: many(tournamentFormats),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  formats: many(formats),
  pokemonTeams: many(pokemonTeams),
  tournaments: many(tournaments),
}));

export const clerkUsersRelations = relations(clerkUsers, ({ one }) => ({
  account: one(accounts, {
    fields: [clerkUsers.accountId],
    references: [accounts.id],
  }),
}));

export const matchGamesRelations = relations(matchGames, ({ one }) => ({
  match: one(matches, {
    fields: [matchGames.matchId],
    references: [matches.id],
  }),
  player_winnerId: one(players, {
    fields: [matchGames.winnerId],
    references: [players.id],
    relationName: "matchGames_winnerId_players_id",
  }),
  player_loserId: one(players, {
    fields: [matchGames.loserId],
    references: [players.id],
    relationName: "matchGames_loserId_players_id",
  }),
  profile: one(profiles, {
    fields: [matchGames.reporterProfileId],
    references: [profiles.id],
  }),
}));

export const matchesRelations = relations(matches, ({ one, many }) => ({
  matchGames: many(matchGames),
  chatMessages: many(chatMessages),
  round: one(rounds, {
    fields: [matches.roundId],
    references: [rounds.id],
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
  player_loserId: one(players, {
    fields: [matches.loserId],
    references: [players.id],
    relationName: "matches_loserId_players_id",
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
}));

export const playersRelations = relations(players, ({ one, many }) => ({
  matchGames_winnerId: many(matchGames, {
    relationName: "matchGames_winnerId_players_id",
  }),
  matchGames_loserId: many(matchGames, {
    relationName: "matchGames_loserId_players_id",
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
  matches_loserId: many(matches, {
    relationName: "matches_loserId_players_id",
  }),
  phasePlayers: many(phasePlayers),
  tournament: one(tournaments, {
    fields: [players.tournamentId],
    references: [tournaments.id],
  }),
  pokemonTeam: one(pokemonTeams, {
    fields: [players.pokemonTeamId],
    references: [pokemonTeams.id],
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

export const roundsRelations = relations(rounds, ({ many }) => ({
  matches: many(matches),
  phases: many(phases),
}));

export const tournamentsRelations = relations(tournaments, ({ one, many }) => ({
  matches: many(matches),
  phases: many(phases, {
    relationName: "phases_tournamentId_tournaments_id",
  }),
  players: many(players),
  tournamentFormats: many(tournamentFormats),
  organization: one(organizations, {
    fields: [tournaments.organizationId],
    references: [organizations.id],
  }),
  game: one(games, {
    fields: [tournaments.gameId],
    references: [games.id],
  }),
  phase: one(phases, {
    fields: [tournaments.currentPhaseId],
    references: [phases.id],
    relationName: "tournaments_currentPhaseId_phases_id",
  }),
}));

export const phasesRelations = relations(phases, ({ one, many }) => ({
  matches: many(matches),
  tournament: one(tournaments, {
    fields: [phases.tournamentId],
    references: [tournaments.id],
    relationName: "phases_tournamentId_tournaments_id",
  }),
  round: one(rounds, {
    fields: [phases.currentRoundId],
    references: [rounds.id],
  }),
  tournaments: many(tournaments, {
    relationName: "tournaments_currentPhaseId_phases_id",
  }),
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

export const phasePlayersRelations = relations(phasePlayers, ({ one }) => ({
  player: one(players, {
    fields: [phasePlayers.playerId],
    references: [players.id],
  }),
}));

export const pokemonTeamsRelations = relations(
  pokemonTeams,
  ({ one, many }) => ({
    players: many(players),
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
  }),
);

export const pokemonRelations = relations(pokemon, ({ one }) => ({
  pokemonTeam: one(pokemonTeams, {
    fields: [pokemon.pokemonTeamId],
    references: [pokemonTeams.id],
  }),
}));

export const tournamentFormatsRelations = relations(
  tournamentFormats,
  ({ one }) => ({
    tournament: one(tournaments, {
      fields: [tournamentFormats.tournamentId],
      references: [tournaments.id],
    }),
    format: one(formats, {
      fields: [tournamentFormats.formatId],
      references: [formats.id],
    }),
  }),
);
