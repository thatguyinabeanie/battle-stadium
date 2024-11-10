"use server";

import type { FetchOptions } from "openapi-fetch";

import { db, eq } from "@battle-stadium/db";
import { tournaments } from "@battle-stadium/db/schema";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getTournament(tournament_id: bigint) {
  return await db.query.tournaments.findFirst({
    with: { organization: true },
    where: eq(tournaments.id, BigInt(tournament_id)),
  });
}

export async function getTournaments(page = 1, pageSize = 20) {
  return await db.query.tournaments.findMany({
    orderBy: (tournaments, { desc }) => desc(tournaments.startAt),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
}

export async function postTournamentRegistration(
  registration: {
    tournament_id: number;
    in_game_name: string;
    profile_id: number;
    pokemon_team_id?: number;
    show_country_flag: boolean;
  },
  options?: FetchOptions<paths["/tournaments/{tournament_id}/players"]["post"]>,
) {
  const {
    tournament_id,
    in_game_name,
    profile_id,
    pokemon_team_id,
    show_country_flag,
  } = registration;

  const registrationOptions = {
    ...defaultConfig(`postTournamentRegistration(${tournament_id})`),
    ...options,
    params: {
      path: { tournament_id },
      query: {
        pokemon_team_id,
        in_game_name,
        profile_id,
        show_country_flag,
      },
    },
  };

  await BattleStadiumApiClient().POST(
    "/tournaments/{tournament_id}/players",
    registrationOptions,
  );
}

export async function getTournamentPlayers(
  tournament_id: bigint,
  options?: FetchOptions<paths["/tournaments/{tournament_id}/players"]["get"]>,
) {
  const tournamentPlayersOptions = {
    ...defaultConfig(`getTournamentPlayers(${tournament_id})`),
    ...options,
    params: { path: { tournament_id: Number(tournament_id) } },
  };

  const resp = await BattleStadiumApiClient().GET(
    "/tournaments/{tournament_id}/players",
    tournamentPlayersOptions,
  );

  return {
    players: resp.data,
    error: resp.error,
  };
}
