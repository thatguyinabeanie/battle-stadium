import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";

export async function generateStaticParams() {
  return (await getOrganizationTournamentsRaw()).map(
    ({ tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments.id.toString(),
    }),
  );
}

export default async function Pairings({
  params,
}: Readonly<OrganizationTournamentParams>) {
  const { org_slug, tournament_id } = await params;

  return (
    <>
      <p>pairings content</p>
      <p>{org_slug}</p>
      <p>{tournament_id}</p>
    </>
  );
}
