import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getOrganizationTournamentsRaw()).map(
    ({ tournaments, organizations }) => ({
      org_slug: organizations?.slug,
      tournament_id: tournaments.id.toString(),
    }),
  );
}

export default async function Metagame({
  params,
}: Readonly<OrganizationTournamentParams>) {
  const { org_slug, tournament_id } = await params;

  return (
    <>
      <p>Metagame content</p>
      <p>{org_slug}</p>
      <p>{tournament_id}</p>
    </>
  );
}
