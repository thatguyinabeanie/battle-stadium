import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";

export async function generateOrganizationTournamentsStaticParams() {
  "use cache";

  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}
