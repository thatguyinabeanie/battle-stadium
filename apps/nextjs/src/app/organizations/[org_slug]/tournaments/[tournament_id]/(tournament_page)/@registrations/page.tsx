import type { OrganizationTournamentProps } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import RegistrationsTable from "~/components/tournaments/registrations-table";

export default async function TournamentRegistrations(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { tournament_id } = params;

  const players = await getTournamentPlayers(tournament_id);
  console.log("tournament_id", tournament_id);
  return <RegistrationsTable players={players} />;
}
