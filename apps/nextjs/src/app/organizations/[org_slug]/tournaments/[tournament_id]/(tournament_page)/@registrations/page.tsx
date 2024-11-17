import type { OrganizationTournamentProps } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";

export default async function TournamentRegistrations(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { tournament_id } = params;

  const players = await getTournamentPlayers(tournament_id);

  return (
    <>
      <h2>TODO: Registrations</h2>
      {players.map(({ players, profiles }) => (
        <div key={players.accountId}>
          <h3>{profiles?.username}</h3>
          <h4>Checked In: {!!players.checkedInAt}</h4>
        </div>
      ))}
    </>
  );
}
