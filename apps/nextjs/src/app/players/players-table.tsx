"use client";

import type { Profile } from "@battle-stadium/db/schema";

import type { Key } from "react";

import Link from "next/link";

export interface PlayersTableProps {
  players: Profile[];
  columns: { key: string; label: string }[];
}

export default function PlayersTable ({
  players,
  columns,
}: Readonly<PlayersTableProps>) {

  return (
    <div className="h-90 w-90 flex flex-col items-center justify-center">
      <h2>TODO: Players Table</h2>

      <table className="table-auto">
        <thead>
          <tr>
            { columns.map(({ key, label }) => (
              <th key={ key }>{ label }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { players.map((player) => (
            <tr key={ player.username }>
              { columns.map(({ key }) => (
                <td key={ key }>{ renderCell(player, key as Key) }</td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

function renderCell (row: Profile, columnKey: Key) {


  switch (columnKey) {
    case "username":
      return (
        <Link
          prefetch={ true } className="text-primary" href={ `/players/${row.username}` }>
          { row.username }
        </Link>
      );
    case "pronouns":
      return "they/them";
    default:
      return row[columnKey as keyof Profile] ?? "-";
  }
}
