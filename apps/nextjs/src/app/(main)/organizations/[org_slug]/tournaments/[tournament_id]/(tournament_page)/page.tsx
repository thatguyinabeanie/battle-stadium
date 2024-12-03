import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";


export async function generateStaticParams () {
  try {
    const data = await getOrganizationTournamentsRaw();
    return data.map(({ tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
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
