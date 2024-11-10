// import PlayersTable from "~/app/players/players-table";
import type { OrganizationTournamentProps } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";

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

  const players = await getTournamentPlayers(tournament_id);

  return (
    <div>
      <h2>TODO: Registrations</h2>
      {players.map(({ players, profiles }) => (
        <div key={profiles?.id}>
          <h3>{profiles?.username}</h3>
          <h4>Checked In: {!!players.checkedInAt}</h4>
        </div>
      ))}
    </div>
    // <PlayersTable columns={columns} players={players?.map((p) => p.profile) ?? []} />
  );
}
