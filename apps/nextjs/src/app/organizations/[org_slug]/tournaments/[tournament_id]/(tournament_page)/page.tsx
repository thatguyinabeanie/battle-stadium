import type { OrganizationTournamentProps } from "~/types";
import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import { getTournament } from "~/app/server-actions/tournaments/actions";

export async function generateMetadata(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const result = await getTournament(params.tournament_id);

  return { title: result?.tournament.name ?? "Tournament" };
}

export async function generateStaticParams() {
  const results = await getOrganizationTournaments(1, 500);

  return results.map(({ tournaments, organizations }) => ({
    org_slug: organizations?.slug,
    tournament_id: tournaments.id.toString(),
  }));
}

export default function OrganizationTournamentDetailsPage(
  _props: Readonly<OrganizationTournamentProps>,
) {
  return <h1>Details</h1>;
}
