"use client";

import type { profiles } from "@battle-stadium/db/schema";

// import { type Key } from "react";

// import Link from "next/link";

export interface PlayersTableProps {
  players: (typeof profiles.$inferSelect)[];
  columns: { key: string; label: string }[];
}

export default function PlayersTable({
  players,
  columns,
}: Readonly<PlayersTableProps>) {
  console.log("columns", columns);
  console.log("players", players);
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
//         <Link
//           prefetch={ true } className="text-primary" href={`/players/${username}`}>
//           {username}
//         </Link>
//       );
//     case "pronouns":
//       return row.pronouns ?? "they/them";
//     default:
//       return row[columnKey as keyof Profile] ?? "-";
//   }
// }
