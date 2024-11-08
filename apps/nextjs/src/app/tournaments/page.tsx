import type { Metadata } from "next";

import { getTournaments } from "~/app/server-actions/tournaments/actions";

export const metadata: Metadata = {
  title: "Tournaments",
};

const columns: { key: string; label: string }[] = [
  {
    key: "start_at",
    label: "DATE",
  },
  {
    key: "organization.name",
    label: "ORGANIZATION",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "game",
    label: "GAME",
  },
  {
    key: "format",
    label: "FORMAT",
  },
  {
    key: "players",
    label: "PLAYERS",
  },
  {
    key: "registration",
    label: "REGISTRATION",
  },
];

export default async function Tournaments() {
  const tours = (await getTournaments()).data?.data ?? [];

  const rightNow = new Date();
  const pastTours = tours.filter(
    (tour) => tour.start_at && new Date(tour.start_at) < rightNow,
  );
  const upcomingTours = tours.filter(
    (tour) => tour.start_at && new Date(tour.start_at) >= rightNow,
  );

  console.log("columns", columns);
  console.log("pastTours", pastTours);
  console.log("upcomingTours", upcomingTours);

  // return <TournamentsTable columns={columns} data={[...pastTours, ...upcomingTours]} />;
  return (
    <div>
      <h2>TODO: tournaments table</h2>
    </div>
  );
}
