import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import { getOrganizationTournamentMatches } from "~/app/server-actions/organizations/tournaments/matches/actions";

export async function generateOrganizationTournamentsStaticParams() {
  'use cache';

  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export async function generateOrganizationTournamentMatchesStaticParams(
  org_slug: string,
  tournament_id: number,
) {
  'use cache';

  const results = await getOrganizationTournamentMatches(
    org_slug,
    tournament_id,
    1,
    500,
  );

  return results.map(({ tournaments, organizations, matches }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments?.id.toString(),
    match_id: matches.id.toString(),
  }));
}
