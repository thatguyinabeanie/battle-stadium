import type { Metadata } from "next";

import { getTournaments } from "~/app/server-actions/tournaments/actions";
import TournamentsTable from "~/components/tournaments/tournaments-table";

export const metadata: Metadata = {
  title: "Tournaments",
};

export default async function Tournaments() {
  return <TournamentsTable data={await getTournaments()} />;
}
