"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import type { Organization } from "@battle-stadium/db/schema";
import {
  Button,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@battle-stadium/ui";

import OrganizationLogo from "./organization-logo";
import Link from "next/link";

interface OrganizationTableProps {
  orgs: Organization[];
}

export default function OrganizationsTable ({ orgs }: OrganizationTableProps) {
  return <DataTable<Organization> data={ orgs } columns={ columns } />;
}

const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          <div className="flex flex-row gap-1">
            Organization
            <ArrowUpDown />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link className="flex flex-row items-center gap-2 text-primary" href={ `/organizations/${row.original.slug}` }>
        <OrganizationLogo organization={ row.original } logoSize={ 32 } />
        { row.getValue("name") }
      </Link>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "partner",
    header: "Partner",
    cell: ({ row }) => (
      <p> { row.original.partner ? "Partner" : "" }</p>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const organization = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={ () =>
                navigator.clipboard.writeText(`${organization.id}`)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
