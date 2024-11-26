"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { OrganizationTournamentView } from "@battle-stadium/db/schema";
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

import { DataTableFooter } from "../data-table-footer";
import OrganizationLogo, {
  DEFAULT_DATA_TABLE_IMAGE_SIZE,
} from "../organizations/organization-logo";

interface TournamentsTableProps {
  data: OrganizationTournamentView[];
}

export function TournamentsTable({ data }: TournamentsTableProps) {
  return (
    <DataTable<OrganizationTournamentView>
      data={data}
      columns={columns}
      footer={ DataTableFooter<OrganizationTournamentView>}
      classNames={{ wrapper: "px-4" }}
    >
      <TournamentsTableFiltering />
    </DataTable>
  );
}

function TournamentsTableFiltering() {
  const table = useDataTable<OrganizationTournamentView>();

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

const columns: ColumnDef<OrganizationTournamentView>[] = [
  {
    accessorKey: "tournaments.date",
    header: "Date",
    cell: ({ row }) => {
      return (
        row.original.tournaments.startAt &&
        new Date(row.original.tournaments.startAt).toLocaleDateString(
          undefined,
          { dateStyle: "medium" },
        )
      );
    },
  },
  {
    accessorKey: "tournaments.startTime",
    header: "Time",
    cell: ({ row }) => {
      return (
        row.original.tournaments.startAt &&
        new Date(row.original.tournaments.startAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    },
  },
  {
    accessorKey: "tournaments.checkInStartAt",
    header: "Check In",
    cell: ({ row }) =>
      row.original.tournaments.checkInStartAt &&
      new Date(row.original.tournaments.checkInStartAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },

  {
    id: "name",
    accessorKey: "tournaments.name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/organizations/${row.original.organizations?.slug}/tournaments/${row.original.tournaments.id}`}
        className="flex flex-row items-center gap-2 text-primary"
        aria-label={`View tournament: ${row.original.tournaments.name}`}
      >
        {row.original.tournaments.name}
      </Link>
    ),
  },
  {
    header: "Organization",
    cell: ({ row }) => (
      <div className="flex flex-col items-center justify-center">
        {row.original.organizations && (
          <Link href={`/organizations/${row.original.organizations.slug}`}>
            <OrganizationLogo
              organization={row.original.organizations}
              logoSize={DEFAULT_DATA_TABLE_IMAGE_SIZE}
              alt={`${row.original.organizations.name} logo`}
            />
          </Link>
        )}
      </div>
    ),
  },
  {
    accessorKey: "tournaments.playerCap",
    header: "Players",
    cell: ({ row }) => {
      if (row.original.tournaments.playerCap) {
        return `${row.original.playerCount}/${row.original.tournaments.playerCap}`;
      }
      return row.original.playerCount;
    },
  },
  {
    accessorKey: "tournaments.lateRegistration",
    header: "Late Registration",
    cell: ({ row }) =>
      row.original.tournaments.lateRegistration ? "Yes" : "No",
  },
  {
    accessorKey: "tournaments.teamlistsRequired",
    header: "Teamlists Required",
    cell: ({ row }) =>
      row.original.tournaments.teamlistsRequired ? "Yes" : "No",
  },
  {
    accessorKey: "tournaments.openTeamSheets",
    header: "Open Team Sheets",
    cell: ({ row }) => (row.original.tournaments.openTeamSheets ? "Yes" : "No"),
  },
];
