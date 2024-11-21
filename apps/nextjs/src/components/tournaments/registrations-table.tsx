"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import type { Player, Profile } from "@battle-stadium/db/schema";
import { DataTable } from "@battle-stadium/ui";

interface PlayerProfile {
  profiles: Profile | null;
  players: Player | null;
}

interface RegistrationsTableProps {
  players: PlayerProfile[];
}

export default function RegistrationsTable({
  players,
}: Readonly<RegistrationsTableProps>) {
  return (
    <DataTable<PlayerProfile> data={players} columns={columns}></DataTable>
  );
}

const columns: ColumnDef<PlayerProfile>[] = [
  {
    accessorKey: "profiles.imageUrl",
    header: "Avatar",
    cell: ({ row }) =>
      row.original.profiles?.imageUrl ? (
        <Image
          src={row.original.profiles.imageUrl}
          alt={`${row.original.profiles.username} avatar`}
          width={50}
          height={50}
        />
      ) : (
        "N/A"
      ),
  },
  {
    accessorKey: "profiles.username",
    header: "Username",
    cell: ({ row }) => row.original.profiles?.username ?? "N/A",
  },
];
