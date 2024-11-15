"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { Organization, Tournament } from "@battle-stadium/db/schema";
import {
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  useDataTable,
} from "@battle-stadium/ui";

interface SingleOrganizationTournamentsTableProps {
  data: Tournament[];
  organization: Organization;
  className?: string;
}

export function SingleOrganizationTournamentsTable({
  data,
  organization,
  className,
}: SingleOrganizationTournamentsTableProps) {
  const preColumn: ColumnDef<Tournament>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/organizations/${organization.slug}/tournaments/${row.original.id}`}
          className="text-primary"
        >
          {row.getValue<string>("name")}
        </Link>
      ),
    },
  ];

  return (
    <div className={className}>
      <DataTable<Tournament> data={data} columns={[...preColumn, ...columns]}>
        <SingleOrganizationTournamentsTableFiltering />
      </DataTable>
    </div>
  );
}

function SingleOrganizationTournamentsTableFiltering() {
  const table = useDataTable<Tournament>();

  if (!table) return null;

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter emails..."
        value={table.getColumn("name")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto flex flex-row">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full backdrop-blur-3xl">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<Tournament>[] = [
  {
    accessorKey: "Start Date",
    header: "Start Date",
    cell: ({ row }) =>
      row.original.startAt && new Date(row.original.startAt).toLocaleString(),
  },
  {
    accessorKey: "checkInStartAt",
    header: "Check-In Start",
    cell: ({ row }) =>
      row.original.checkInStartAt &&
      new Date(row.original.checkInStartAt).toLocaleString(),
  },
  {
    accessorKey: "Game",
    header: "Game ID",
    cell: ({ row }) => row.original.gameId,
  },
  {
    accessorKey: "Format",
    header: "Format ID",
    cell: ({ row }) => row.original.formatId,
  },
  {
    accessorKey: "Player Cap",
    header: "Player Cap",
    cell: ({ row }) => row.original.playerCap,
  },
  {
    accessorKey: "Late Registration",
    header: "Late Registration",
    cell: ({ row }) => (row.original.lateRegistration ? "Yes" : "No"),
  },
  {
    accessorKey: "Team List Required?",
    header: "Teamlists Required",
    cell: ({ row }) => (row.original.teamlistsRequired ? "Yes" : "No"),
  },
  {
    accessorKey: "openTeamSheets",
    header: "Open Team Sheets",
    cell: ({ row }) => (row.original.openTeamSheets ? "Yes" : "No"),
  },
];
