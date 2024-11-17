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

import { Footer } from "../data-table-footer";
import OrganizationLogo, {
  DEFAULT_DATA_TABLE_IMAGE_SIZE,
} from "../organizations/organization-logo";

interface OrganizationTournament {
  tournaments: Tournament;
  organizations: Organization | null;
}

interface TournamentsTableProps {
  data: OrganizationTournament[];
}

export function TournamentsTable({ data }: TournamentsTableProps) {
  return (
    <DataTable<OrganizationTournament>
      data={data}
      columns={columns}
      footer={Footer<OrganizationTournament>}
      classNames={{ wrapper: "px-4" }}
    >
      <TournamentsTableFiltering />
    </DataTable>
  );
}

function TournamentsTableFiltering() {
  const table = useDataTable<OrganizationTournament>();

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

const columns: ColumnDef<OrganizationTournament>[] = [
  {
    header: "Organization",
    cell: ({ row }) => (
      <div className="flex flex-col items-center justify-center">
        {row.original.organizations && (
          <OrganizationLogo
            organization={row.original.organizations}
            logoSize={DEFAULT_DATA_TABLE_IMAGE_SIZE}
          />
        )}
      </div>
    ),
  },
  {
    id: "name",
    accessorKey: "tournaments.name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/organizations/${row.original.organizations?.slug}/tournaments/${row.original.tournaments.id}`}
        className="flex flex-row items-center gap-2 text-primary"
      >
        {row.original.tournaments.name}
      </Link>
    ),
  },
  {
    accessorKey: "tournaments.startAt",
    header: "Start Date",
    cell: ({ row }) => {
      return (
        row.original.tournaments.startAt &&
        new Date(row.original.tournaments.startAt).toLocaleString()
      );
    },
  },
  {
    accessorKey: "tournaments.checkInStartAt",
    header: "Check-In Start",
    cell: ({ row }) =>
      row.original.tournaments.checkInStartAt &&
      new Date(row.original.tournaments.checkInStartAt).toLocaleString(),
  },
  {
    accessorKey: "tournaments.gameId",
    header: "Game ID",
    cell: ({ row }) => row.original.tournaments.gameId,
  },
  {
    accessorKey: "tournaments.formatId",
    header: "Format ID",
    cell: ({ row }) => row.original.tournaments.formatId,
  },
  {
    accessorKey: "tournaments.playerCap",
    header: "Player Cap",
    cell: ({ row }) => row.original.tournaments.playerCap,
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
