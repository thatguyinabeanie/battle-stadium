import type * as schema from "../drizzle/schema";

export * from "../drizzle/schema";
export type Account = typeof schema.accounts.$inferSelect;
export type AccountInsert = typeof schema.accounts.$inferInsert;

export type ChatMessage = typeof schema.chatMessages.$inferInsert;
export type ChatMessageInsert = typeof schema.chatMessages.$inferInsert;

export type ClerkUser = typeof schema.clerkUsers.$inferSelect;
export type ClerkUserInsert = typeof schema.clerkUsers.$inferInsert;

export type Format = typeof schema.formats.$inferSelect;
export type FormatInsert = typeof schema.formats.$inferInsert;
export type Game = typeof schema.games.$inferSelect;
export type GameInsert = typeof schema.games.$inferInsert;

export type MatchGame = typeof schema.matchGames.$inferSelect;
export type MatchGameInsert = typeof schema.matchGames.$inferInsert;

export type Match = typeof schema.matches.$inferSelect;
export type MatchInsert = typeof schema.matches.$inferInsert;

export type OrganizationStaffMember =
  typeof schema.organizationStaffMembers.$inferSelect;
export type OrganizationStaffMemberInsert =
  typeof schema.organizationStaffMembers.$inferInsert;

export type Organization = typeof schema.organizations.$inferSelect;
export type OrganizationInsert = typeof schema.organizations.$inferInsert;

export type PhasePlayer = typeof schema.phasePlayers.$inferSelect;
export type PhasePlayerInsert = typeof schema.phasePlayers.$inferInsert;

export type Phase = typeof schema.phases.$inferSelect;
export type PhaseInsert = typeof schema.phases.$inferInsert;

export type Player = typeof schema.players.$inferSelect;
export type PlayerInsert = typeof schema.players.$inferInsert;

export type PokemonTeam = typeof schema.pokemonTeams.$inferSelect;
export type PokemonTeamInsert = typeof schema.pokemonTeams.$inferInsert;

export type Pokemon = typeof schema.pokemon.$inferSelect;
export type PokemonInsert = typeof schema.pokemon.$inferInsert;

export type Profile = typeof schema.profiles.$inferSelect;
export type ProfileInsert = typeof schema.profiles.$inferInsert;

export type Round = typeof schema.rounds.$inferSelect;
export type RoundInsert = typeof schema.rounds.$inferInsert;

export type TournamentFormat = typeof schema.tournamentFormats.$inferSelect;
export type TournamentFormatInsert =
  typeof schema.tournamentFormats.$inferInsert;

export type Tournament = typeof schema.tournaments.$inferSelect;
export type TournamentInsert = typeof schema.tournaments.$inferInsert;

export type Rk9Tournament = typeof schema.rk9Tournaments.$inferSelect;
export type Rk9TournamentInsert = typeof schema.rk9Tournaments.$inferInsert;

export interface OrganizationTournament {
  tournaments: Tournament;
  organizations: Organization | null;
}

export interface OrganizationTournamentView extends OrganizationTournament {
  playerCount?: number;
}

export interface TournamentWithPlayerCount extends Tournament {
  playerCount: number;
}
