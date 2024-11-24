"use server";

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
  const results = await MatchesLeftJoinTournamentsLeftJoinOrganizations()
    .where(
      and(eq(organizations.slug, org_slug), eq(tournaments.id, tournament_id)),
    )
    .orderBy(desc(matches.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return results;
}

export async function getOrganizationTournamentMatches(
  org_slug: string,
  tournament_id: number,
  page = 1,
  pageSize = 20,
) {
  return await getOrganizationTournamentMatchesRaw(
    org_slug,
    tournament_id,
    page,
    pageSize,
  );
}
