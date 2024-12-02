import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";

export async function generateStaticParams() {
  const results = await getOrganizationTournamentsRaw(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export default function OrganizationTournamentDetailsPage(
  _props: Readonly<OrganizationTournamentParams>,
) {
  return (
    <>
      <p>Details and Rules and Things</p>
    </>
  );
}
