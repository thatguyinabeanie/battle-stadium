import { Suspense } from "react";

import type { OrganizationTournamentParams } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import RegistrationsTable from "~/components/tournaments/registrations-table";

export default function TournamentRegistrationsPage(
  props: Readonly<OrganizationTournamentParams>,
) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TournamentRegistrations {...props} />
    </Suspense>
  );
}

async function TournamentRegistrations(
  props: Readonly<OrganizationTournamentParams>,
) {
  const params = await props.params;
  const { tournament_id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TournamentsRegistrationTable tournament_id={tournament_id} />
    </Suspense>
  );
}

async function TournamentsRegistrationTable({
  tournament_id,
}: {
  tournament_id: number;
}) {
  const players = await getTournamentPlayers(tournament_id);
  return <RegistrationsTable players={players} />;
}
