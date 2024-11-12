"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import type { Tournament } from "@battle-stadium/db/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
} from "@battle-stadium/ui";

import DataTable, { useDataTable } from "../data-table";

interface TournamentsTableProps {
  data: Tournament[];
}
export default function TournamentsTable({ data }: TournamentsTableProps) {
  return (
    <DataTable<Tournament> data={data} columns={columns}>
      <TournamentsTableFiltering />
    </DataTable>
  );
}

function TournamentsTableFiltering() {
  const table = useDataTable<Tournament>();
  if (!table) return null;
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter emails..."
        value={table.getColumn("email")?.getFilterValue() as string}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue<string>("name"),
  },
  {
    accessorKey: "startAt",
    header: "Start Date",
    cell: ({ row }) =>
      new Date(row.getValue<string>("startAt")).toLocaleString(),
  },
  {
    accessorKey: "endedAt",
    header: "Ended At",
    cell: ({ row }) =>
      new Date(row.getValue<string>("endedAt")).toLocaleString(),
  },
  {
    accessorKey: "organizationId",
    header: "Organization ID",
    cell: ({ row }) => row.getValue<string>("organizationId"),
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
    accessorKey: "registrationStartAt",
    header: "Registration Start",
    cell: ({ row }) =>
      new Date(row.getValue<string>("registrationStartAt")).toLocaleString(),
  },
  {
    accessorKey: "registrationEndAt",
    header: "Registration End",
    cell: ({ row }) =>
      new Date(row.getValue<string>("registrationEndAt")).toLocaleString(),
  },
  {
    accessorKey: "playerCap",
    header: "Player Cap",
    cell: ({ row }) => row.getValue<number>("playerCap"),
  },
  {
    accessorKey: "autostart",
    header: "Autostart",
    cell: ({ row }) => (row.getValue<boolean>("autostart") ? "Yes" : "No"),
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) =>
      new Date(row.getValue<string>("startedAt")).toLocaleString(),
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
  {
    accessorKey: "endAt",
    header: "End At",
    cell: ({ row }) => new Date(row.getValue<string>("endAt")).toLocaleString(),
  },
];
