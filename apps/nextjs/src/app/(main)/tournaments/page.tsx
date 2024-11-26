import type { Metadata } from "next";
import { Suspense } from "react";

import type { OrganizationTournament } from "@battle-stadium/db/schema";

import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import { TournamentsTable } from "~/components/tournaments/tournaments-table";

export const metadata: Metadata = {
  title: "Tournaments",
};

export default function TournamentsSuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading tournaments...</div>}>
      <Tournaments />
    </Suspense>
  );
}

async function Tournaments() {
  const data: OrganizationTournament[] = await getOrganizationTournaments();

  return <TournamentsTable data={data} />;
}
