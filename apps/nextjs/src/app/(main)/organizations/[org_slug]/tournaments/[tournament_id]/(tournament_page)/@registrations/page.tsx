import { Suspense } from "react";

import type { OrganizationTournamentParams } from "~/types";
import { getTournamentPlayers } from "~/app/server-actions/tournaments/actions";
import RegistrationsTable from "~/components/tournaments/registrations-table";
import { getOrganizationTournamentsRaw } from "~/app/server-actions/organizations/tournaments/actions";


export async function generateStaticParams () {
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TournamentRegistrations {...props} />
    </Suspense>
  );
}

async function TournamentRegistrations(
  { params }: Readonly<OrganizationTournamentParams>,
) {
  const { tournament_id } = await params;
  return <TournamentsRegistrationTable tournament_id={tournament_id} />;
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
