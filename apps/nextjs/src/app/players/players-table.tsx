"use client";

// import { type Key } from "react";

// import Link from "next/link";

import { type Profile } from "~/lib/api";

export interface PlayersTableProps {
  players: Profile[];
  columns: { key: string; label: string }[];
}

export default function PlayersTable({
  players,
  columns,
}: Readonly<PlayersTableProps>) {
  console.log("columns", columns); // eslint-disable-line no-console
  console.log("players", players); // eslint-disable-line no-console
  return (
    <div className="h-90 w-90 flex flex-col items-center justify-center">
      <h2>TODO: Players Table</h2>
    </div>
  );
}

// function renderCell(row: Profile, columnKey: Key) {
//   const { username } = row;

//   switch (columnKey) {
//     case "username":
//       return (
//         <Link className="text-primary" href={`/players/${username}`}>
//           {username}
//         </Link>
//       );
//     case "pronouns":
//       return row.pronouns ?? "they/them";
//     default:
//       return row[columnKey as keyof Profile] ?? "-";
//   }
// }
