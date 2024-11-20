import type { OrganizationTournamentProps } from "~/types";
import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import { getTournament } from "~/app/server-actions/tournaments/actions";
import { CardHeader, CardContent } from "@battle-stadium/ui";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const result = await getTournament(params.tournament_id);

  return { title: result?.tournament.name ?? "Tournament" };
}

export async function generateStaticParams () {
  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export default function OrganizationTournamentDetailsPage (
  _props: Readonly<OrganizationTournamentProps>,
) {
  return (
    <>
      <p>Details and Rules and Things</p>
    </>
  )
}
