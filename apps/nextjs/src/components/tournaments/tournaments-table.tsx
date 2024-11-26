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
      footer={DataTableFooter<OrganizationTournamentView>}
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

        <DropdownMenuContent align="end" className="bg-background">
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
    accessorKey: "Date",
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
    accessorKey: "Time",
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
    accessorKey: "Check In",
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
    accessorKey: "Name",
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
    accessorKey: "Organization",
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
    accessorKey: "Players",
    header: "Players",
    cell: ({ row }) => {
      if (row.original.tournaments.playerCap) {
        return (
          <span className="font-mono">
            {row.original.playerCount}
            <span className="text-muted-foreground">/</span>
            {row.original.tournaments.playerCap}
          </span>
        );
      }
      return <span className="font-mono">{row.original.playerCount}</span>;
    },
  },
  {
    accessorKey: "Registration",
    header: "Registration",
    cell: ({ row }) =>
      row.original.tournaments.lateRegistration ? "Yes" : "No",
  },
  {
    accessorKey: "Team Lists",
    header: "Team Lists",
    cell: ({ row }) =>
      row.original.tournaments.teamlistsRequired ? "Yes" : "No",
  },
  {
    accessorKey: "Open Team Sheets",
    header: "Open Team Sheets",
    cell: ({ row }) => (row.original.tournaments.openTeamSheets ? "Yes" : "No"),
  },
];
