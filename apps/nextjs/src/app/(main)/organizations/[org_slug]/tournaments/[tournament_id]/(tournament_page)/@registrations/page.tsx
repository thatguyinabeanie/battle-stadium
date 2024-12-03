import type { OrganizationTournamentParams } from "~/types";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import RegistrationsTable from "~/components/tournaments/registrations-table";

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

export default function TournamentRegistrationsPage(
  props: Readonly<OrganizationTournamentParams>,
) {
  const { tournament_id } = await props.params;
  return <TournamentsRegistrationTable tournament_id={ tournament_id } />;
}

async function TournamentsRegistrationTable({
  tournament_id,
}: {
  tournament_id: number;
}) {
  "use cache";
  const players = await getTournamentPlayers(tournament_id);
  return <RegistrationsTable players={players} />;
}
