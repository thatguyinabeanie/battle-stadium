"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { Tournament } from "@battle-stadium/db/schema";
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
  org_slug: string;
}

export function SingleOrganizationTournamentsTable({
  data,
  org_slug,
}: SingleOrganizationTournamentsTableProps) {
  const preColumn: ColumnDef<Tournament>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/organizations/${org_slug}/tournaments/${row.original.id}`}
          className="text-primary"
        >
          {row.getValue<string>("name")}
        </Link>
      ),
    },
  ];

  return (
    <DataTable<Tournament> data={data} columns={[...preColumn, ...columns]}>
      <SingleOrganizationTournamentsTableFiltering />
    </DataTable>
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
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
    accessorKey: "startAt",
    header: "Start Date",
    cell: ({ row }) =>
      new Date(row.getValue<string>("startAt")).toLocaleString(),
  },
  {
    accessorKey: "checkInStartAt",
    header: "Check-In Start",
    cell: ({ row }) =>
      new Date(row.getValue<string>("checkInStartAt")).toLocaleString(),
  },
  {
    accessorKey: "gameId",
    header: "Game ID",
    cell: ({ row }) => row.getValue<string>("gameId"),
  },
  {
    accessorKey: "formatId",
    header: "Format ID",
    cell: ({ row }) => row.getValue<string>("formatId"),
  },
  {
    accessorKey: "playerCap",
    header: "Player Cap",
    cell: ({ row }) => row.getValue<number>("playerCap"),
  },
  {
    accessorKey: "lateRegistration",
    header: "Late Registration",
    cell: ({ row }) =>
      row.getValue<boolean>("lateRegistration") ? "Yes" : "No",
  },
  {
    accessorKey: "teamlistsRequired",
    header: "Teamlists Required",
    cell: ({ row }) =>
      row.getValue<boolean>("teamlistsRequired") ? "Yes" : "No",
  },
  {
    accessorKey: "openTeamSheets",
    header: "Open Team Sheets",
    cell: ({ row }) => (row.getValue<boolean>("openTeamSheets") ? "Yes" : "No"),
  },
];
