import type { Metadata } from "next";

import type { OrganizationTournament } from "@battle-stadium/db/schema";

import { getOrganizationTournaments } from "~/app/server-actions/organizations/tournaments/actions";
import { TournamentsTable } from "~/components/tournaments/tournaments-table";

export const metadata: Metadata = {
  title: "Tournaments",
};

export default function TournamentsSuspenseWrapper() {
  return (
    <section
      role="region"
      aria-label="Tournament Header"
      className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
    >
      <Tournaments />
    </section>
  );
}

async function Tournaments() {
  const data: OrganizationTournament[] = await getOrganizationTournaments();

  return <TournamentsTable data={data} />;
}
