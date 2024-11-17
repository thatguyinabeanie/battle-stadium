"use client";

import type {
  ColumnDef,
  Table as ReactTable,
  RowData,
} from "@tanstack/react-table";
import React from "react";
import { flexRender } from "@tanstack/react-table";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@battle-stadium/ui";

import { DataTableContext } from "./data-table-context";
import { useTanstackReactTable } from "./use-tanstack-react-table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  children?: React.ReactNode;
  classNames?: {
    wrapper?: string;
    table?: string;
    tableHead?: string;
    tableHeader?: string;
    tableRow?: string;
    tableHeaderRow?: string;
    tableBody?: string;
    tableCell?: string;
  };
  footer?: ({ table }: { table: ReactTable<T> }) => React.ReactNode;
}

const wrapperClassNames = "w-full rounded-md";
export default function DataTable<T extends RowData>({
  data,
  columns,
  children,
  classNames,
  footer,
}: DataTableProps<T>) {
  const {
    wrapper,
    table: tableClass,
    tableHead,
    tableHeader,
    tableHeaderRow,
    tableRow,
    tableBody,
    tableCell,
  } = classNames ?? {};

  const table = useTanstackReactTable<T>(data, columns);
  return (
    <DataTableContext.Provider
      value={{ table: table as ReactTable<unknown> | null }}
    >
      <div className={`${wrapperClassNames} ${wrapper}`}>{children}</div>

      <div className={`${wrapperClassNames} ${wrapper}`}>
        <Table className={tableClass}>
          <TableHeader className={tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={tableHeaderRow}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={tableHead}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={tableBody}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={tableRow}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={tableCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={tableRow}>
                <TableCell
                  colSpan={columns.length}
                  className={`h-24 text-center ${tableCell}`}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className={`${wrapperClassNames} ${wrapper}`}>
        {footer ? footer({ table }) : <DefaultFooter<T> table={table} />}
      </div>
    </DataTableContext.Provider>
  );
}

function DefaultFooter<T>({ table }: { table: ReactTable<T> }) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
