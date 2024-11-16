"use server";

import { and, db, desc, eq } from "@battle-stadium/db";
import { organizations, tournaments } from "@battle-stadium/db/schema";
import { unstable_noStore } from "next/cache";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

function tournamentsLeftJoinOrganizations () {
  return db
    .select()
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id));
}

export async function getOrganizationTournaments (page = 1, pageSize = 20) {
  "use cache";
  cacheTag("/organizations/tournaments");
  cacheLife("hours");
  return await tournamentsLeftJoinOrganizations()
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getSingleOrganizationTournaments (
  slug: string,
  page = 1,
  pageSize = 20,
) {
  "use cache";
  cacheTag(`/organizations/${slug}/tournaments`);
  cacheLife("hours");
  const results = await tournamentsLeftJoinOrganizations()
    .where(eq(organizations.slug, slug))
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    tournaments: results.map(({ tournaments }) => tournaments),
    organization: results[0]?.organizations,
  };
}

export async function getSingleOrganizationSingleTournament (
  slug: string,
  tournamentId: number,
) {
  unstable_noStore();
  const results = await tournamentsLeftJoinOrganizations()
    .where(and(eq(organizations.slug, slug), eq(tournaments.id, tournamentId)))
    .orderBy(desc(tournaments.startAt))
    .limit(1);

  return {
    tournament: results[0]?.tournaments,
    organization: results[0]?.organizations,
  };
}
