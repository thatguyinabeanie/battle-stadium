import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";
import type { OrganizationTournamentProps } from "~/types";

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

export default function Standings(
  _props: Readonly<OrganizationTournamentProps>,
) {
  return (
    <>
      <p>Standings content</p>
    </>
  );
}
