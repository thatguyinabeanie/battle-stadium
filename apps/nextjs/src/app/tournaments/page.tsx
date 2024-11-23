import type { Metadata } from "next";

import type { Organization, Tournament } from "@battle-stadium/db/schema";

import { getOrganizationTournaments } from "~/app/(server-actions)/organizations/tournaments/actions";
import { TournamentsTable } from "~/components/tournaments/tournaments-table";

export const metadata: Metadata = {
  title: "Tournaments",
};

interface OrganizationTournament {
  tournaments: Tournament;
  organizations: Organization | null;
}
export default async function Tournaments() {
  const data: OrganizationTournament[] = await getOrganizationTournaments();

  return <TournamentsTable data={data} />;
}
