"use server";

import type { FetchOptions } from "openapi-fetch";
import type { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

// import { cacheLife } from "next/dist/server/use-cache/cache-life";
// import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { count, db, eq } from "@battle-stadium/db";
import {
  organizations,
  players,
  profiles,
  tournaments,
} from "@battle-stadium/db/schema";

import type { TournamentFormSchema } from "~/app/dashboard/organizations/[org_slug]/create/_components/zod-schema";
import type { components, paths } from "~/lib/api/openapi-v1";
import type { Tokens } from "~/types";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getTournament(tournament_id: number) {
  // "use cache";
  // cacheTag(`getTournament(${tournament_id})`);
  // cacheLife("hours");
  // TODO: revalidate on tournament update

  const result = await db
    .select()
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id))
    .where(eq(tournaments.id, tournament_id))
    .orderBy(tournaments.startAt);

  return result.length > 0 && result[0]
    ? {
        tournament: result[0].tournaments,
        organization: result[0].organizations,
      }
    : null;
}

export async function getTournaments(page = 1, pageSize = 20) {
  // "use cache";
  // cacheTag(`getTournaments(${page},${pageSize})`);
  // cacheLife("hours");
  // TODO: revalidate on tournament creation

  return db.query.tournaments.findMany({
    orderBy: (tournaments, { desc }) => desc(tournaments.startAt),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

interface TournamentRegistration {
  tournamentId: number;
  inGameName: string;
  profileId: number;
  pokemonTeamId?: number;
  showCountryFlag: boolean;
}

export interface PostTournamentRegistrationResponse {
  id: number;
  profile: components["schemas"]["Profile"];
  in_game_name: string;
  show_country_flag?: boolean;
}

export async function postTournamentRegistration(
  {
    tournamentId,
    inGameName,
    profileId,
    pokemonTeamId,
    showCountryFlag,
  }: TournamentRegistration,
  tokens: Tokens,
  options?: FetchOptions<paths["/tournaments/{tournament_id}/players"]["post"]>,
) {
  const registrationOptions: FetchOptions<
    paths["/tournaments/{tournament_id}/players"]["post"]
  > = {
    ...defaultConfig("postTournamentRegistration"),
    ...options,
    params: {
      query: {
        in_game_name: inGameName,
        profile_id: profileId,
        pokemon_team_id: pokemonTeamId,
        show_country_flag: showCountryFlag,
      },
      path: {
        tournament_id: tournamentId,
      },
    },
  };

  const resp = await BattleStadiumApiClient(tokens).POST(
    "/tournaments/{tournament_id}/players",
    registrationOptions,
  );
  return resp.data as PostTournamentRegistrationResponse | undefined;
}

export async function getTournamentPlayers(tournament_id: number) {
  // "use cache";
  // cacheTag(`getTournamentPlayers-${tournament_id}`);
  // cacheLife("minutes");
  // TODO: revalidate on player registration

  return await db
    .select()
    .from(players)
    .leftJoin(profiles, eq(players.profileId, profiles.id))
    .where(eq(players.tournamentId, tournament_id))
    .orderBy(players.createdAt);
}

export async function getTournamentPlayerCount(tournament_id: number) {
  // "use cache";
  // cacheTag(`getTournamentPlayerCount-${tournament_id}`);
  // cacheLife("minutes");
  // TODO: revalidate on player registration

  const result = await db
    .select({
      count: count(players.id),
    })
    .from(players)
    .where(eq(players.tournamentId, tournament_id));

  return result[0]?.count ?? 0;
}

export async function postTournament(
  data: z.infer<typeof TournamentFormSchema>,
  org_slug: string,
) {
  const session = await auth();
  if (!session.userId) {
    return null;
  }
  const tokens: Tokens = {
    oidc: await getVercelOidcToken(),
    clerk: await session.getToken(),
  };

  const result = await BattleStadiumApiClient(tokens).POST(
    "/organizations/{slug}/tournaments",
    {
      params: {
        path: {
          slug: org_slug,
        },
      },
      body: {
        name: data.tournamentName,
        autostart: false,
        start_at: data.startDate.toUTCString(),
        check_in_start_at: data.requireCheckIn
          ? new Date(data.startDate.getTime() - 60 * 60 * 1000).toUTCString()
          : null,
        late_registration: data.lateRegistration,
        teamlists_required: data.teamSheetRequired,
        open_team_sheets: data.openTeamSheet,
        player_cap: data.playerCap ? data.maxPlayers : null,
        registration_start_at: data.startDate.toUTCString(),
        game_id: data.game_id,
        format_id: data.format_id,
        registration_end_at: null,
      },
    },
  );

  return {
    tournament: result.data as components["schemas"]["Tournament"],
  };
}
