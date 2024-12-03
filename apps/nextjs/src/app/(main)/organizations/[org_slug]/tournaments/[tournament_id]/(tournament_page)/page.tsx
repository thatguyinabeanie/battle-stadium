import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";

export async function generateStaticParams() {
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

export default async function OrganizationTournamentDetailsPage({params}: Readonly<OrganizationTournamentParams>) {
  const { org_slug, tournament_id } = await params;

  return (
    <>
      <p>Metagame content</p>
      <p>{ org_slug }</p>
      <p>{ tournament_id }</p>
    </>
  );
}
