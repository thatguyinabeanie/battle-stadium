"use server";

import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { and, db, desc, eq } from "@battle-stadium/db";
import { matches, organizations, tournaments } from "@battle-stadium/db/schema";

function MatchesLeftJoinTournamentsLeftJoinOrganizations() {
  return db
    .select()
    .from(matches)
    .leftJoin(tournaments, eq(matches.tournamentId, tournaments.id))
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id));
}

async function getOrganizationTournamentMatchesRaw(
  org_slug: string,
  tournament_id: number,
  page = 1,
  pageSize = 20,
) {
  "use cache";
  cacheTag(`getOrganizationTournamentMatches(${org_slug}, ${tournament_id})`);

  return MatchesLeftJoinTournamentsLeftJoinOrganizations()
    .where(
      and(eq(organizations.slug, org_slug), eq(tournaments.id, tournament_id)),
    )
    .orderBy(desc(matches.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getOrganizationTournamentMatches(
  org_slug: string,
  tournament_id: number,
  page = 1,
  pageSize = 20,
) {
  return getOrganizationTournamentMatchesRaw(
    org_slug,
    tournament_id,
    page,
    pageSize,
  );
}
