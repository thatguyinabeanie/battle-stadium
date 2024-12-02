"use server";

import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { count } from "drizzle-orm";

import { and, db, desc, eq } from "@battle-stadium/db";
import { organizations, players, tournaments } from "@battle-stadium/db/schema";

function tournamentsLeftJoinOrganizations() {
  return db
    .select()
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id));
}

function tournamentsLeftJoinOrganizationsWithPlayerCounts() {
  return db
    .select({
      tournaments,
      organizations,
      playerCount: count(players.id).as("playerCount"),
    })
    .from(tournaments)
    .leftJoin(organizations, eq(tournaments.organizationId, organizations.id))
    .leftJoin(players, eq(players.tournamentId, tournaments.id))
    .groupBy(organizations.id, tournaments.id);
}

export async function getOrganizationTournamentsRaw(page = 1, pageSize = 20) {
  return tournamentsLeftJoinOrganizationsWithPlayerCounts()
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getOrganizationTournaments(page = 1, pageSize = 20) {
  "use cache";
  cacheTag(`getOrganizationTournaments(${page},${pageSize})`);
  cacheLife("days");
  // TODO: revalidate on tournament creation

  return getOrganizationTournamentsRaw(page, pageSize);
}

async function getSingleOrganizationTournamentsRaw(
  slug: string,
  page = 1,
  pageSize = 20,
) {
  "use cache";
  cacheTag(`getSingleOrganizationTournamentsRaw(${slug},${page},${pageSize})`);
  cacheLife("days");
  // TODO: revalidate on tournament creation

  return tournamentsLeftJoinOrganizations()
    .where(eq(organizations.slug, slug))
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getSingleOrganizationTournaments(
  slug: string,
  page = 1,
  pageSize = 20,
) {
  "use cache";
  cacheTag(`getSingleOrganizationTournaments(${slug},${page},${pageSize})`);
  cacheLife("days");
  // TODO: revalidate on tournament creation

  const results = await getSingleOrganizationTournamentsRaw(
    slug,
    page,
    pageSize,
  );
  return {
    tournaments: results.map(({ tournaments }) => tournaments),
    organization: results[0]?.organizations,
  };
}

async function getSingleOrganizationSingleTournamentRaw(
  slug: string,
  tournamentId: number,
) {
  "use cache";
  cacheTag(`getSingleOrganizationSingleTournamentRaw(${slug},${tournamentId})`);
  cacheLife("minutes");
  // TODO: revalidate on tournament update

  return tournamentsLeftJoinOrganizations()
    .where(and(eq(organizations.slug, slug), eq(tournaments.id, tournamentId)))
    .orderBy(desc(tournaments.startAt))
    .limit(1);
}

export async function getSingleOrganizationSingleTournament(
  slug: string,
  tournamentId: number,
) {
  const results = await getSingleOrganizationSingleTournamentRaw(
    slug,
    tournamentId,
  );

  return {
    tournament: results[0]?.tournaments,
    organization: results[0]?.organizations,
  };
}
