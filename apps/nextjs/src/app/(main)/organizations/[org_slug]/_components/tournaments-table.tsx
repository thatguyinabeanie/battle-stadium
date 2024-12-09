"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type {
  Organization,
  TournamentWithPlayerCount,
} from "@battle-stadium/db/schema";
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
  data: TournamentWithPlayerCount[];
  organization: Organization;
  className?: string;
}

export function SingleOrgTournamentsTable({
  data,
  organization,
  className,
}: SingleOrganizationTournamentsTableProps) {
  const preColumn: ColumnDef<TournamentWithPlayerCount>[] = [
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
      <DataTable<TournamentWithPlayerCount>
        data={data}
        columns={[...preColumn, ...columns]}
      >
        <SingleOrganizationTournamentsTableFiltering />
      </DataTable>
    </div>
  );
}

function SingleOrganizationTournamentsTableFiltering() {
  const table = useDataTable<TournamentWithPlayerCount>();

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

const columns: ColumnDef<TournamentWithPlayerCount>[] = [
  {
    accessorKey: "tournaments.startAt",
    header: "Date",
    cell: ({
      row: {
        original: { startAt },
      },
    }) =>
      startAt &&
      new Date(startAt).toLocaleDateString(undefined, {
        dateStyle: "medium",
      }),
  },
  {
    accessorKey: "checkInStartAt",
    header: "Check In",
    cell: ({
      row: {
        original: { checkInStartAt },
      },
    }) =>
      checkInStartAt &&
      new Date(checkInStartAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "Players",
    header: "Players",
    cell: ({
      row: {
        original: { playerCount, playerCap },
      },
    }) => (playerCap !== null ? `${playerCount}/${playerCap}` : playerCount),
  },
  {
    accessorKey: "Late Registration",
    header: "Late Registration",
    cell: ({
      row: {
        original: { lateRegistration },
      },
    }) => (lateRegistration ? "Yes" : "No"),
  },
  {
    accessorKey: "Team List Required?",
    header: "Teamlists Required",
    cell: ({
      row: {
        original: { teamlistsRequired },
      },
    }) => (teamlistsRequired ? "Yes" : "No"),
  },
  {
    accessorKey: "openTeamSheets",
    header: "Open Team Sheets",
    cell: ({
      row: {
        original: { openTeamSheets },
      },
    }) => (openTeamSheets ? "Yes" : "No"),
  },
];
