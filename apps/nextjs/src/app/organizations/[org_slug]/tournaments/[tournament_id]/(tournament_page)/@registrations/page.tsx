// import PlayersTable from "~/app/players/players-table";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import type {OrganizationTournamentProps} from "~/types";

// const columns = [
//   {
//     key: "username",
//     label: "Username",
//   },
//   {
//     key: "pronouns",
//     label: "Pronouns",
//   },
// ];

export default async function TournamentRegistrations(
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { tournament_id } = params;

  const { players } = await getTournamentPlayers(tournament_id);

  return (
    <div>
      <h2>TODO: Registrations</h2>
      {players?.map((player) => (
        <div key={player.id}>
          <h3>{player.profile.username}</h3>
        </div>
      ))}
    </div>
    // <PlayersTable columns={columns} players={players?.map((p) => p.profile) ?? []} />
  );
}
