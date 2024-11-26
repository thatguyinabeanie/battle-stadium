"use server";

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

async function getOrganizationTournamentsRaw(page = 1, pageSize = 20) {
  const results = await tournamentsLeftJoinOrganizationsWithPlayerCounts()
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return results;
}

export async function getOrganizationTournaments(page = 1, pageSize = 20) {
  return getOrganizationTournamentsRaw(page, pageSize);
}

async function getSingleOrganizationTournamentsRaw(
  slug: string,
  page = 1,
  pageSize = 20,
) {
  const results = await tournamentsLeftJoinOrganizations()
    .where(eq(organizations.slug, slug))
    .orderBy(desc(tournaments.startAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return results;
}

export async function getSingleOrganizationTournaments(
  slug: string,
  page = 1,
  pageSize = 20,
) {
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
  const results = await tournamentsLeftJoinOrganizations()
    .where(and(eq(organizations.slug, slug), eq(tournaments.id, tournamentId)))
    .orderBy(desc(tournaments.startAt))
    .limit(1);

  return results;
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
