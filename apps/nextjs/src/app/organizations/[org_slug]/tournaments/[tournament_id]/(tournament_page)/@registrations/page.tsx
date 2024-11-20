import type { OrganizationTournamentProps } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import { CardContent, CardHeader } from "@battle-stadium/ui";

export default async function TournamentRegistrations (
  props: Readonly<OrganizationTournamentProps>,
) {
  const params = await props.params;
  const { tournament_id } = params;

  const players = await getTournamentPlayers(tournament_id);

  return (
    <>

      { players.map(({ players, profiles }) => (
        <div key={ players.accountId }>
          <h3>{ profiles?.username }</h3>
          <h4>Checked In: { !!players.checkedInAt }</h4>
        </div>
      )) }

    </>
  );
}



