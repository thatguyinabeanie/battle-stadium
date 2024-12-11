"use client";

import type { RowData, useReactTable } from "@tanstack/react-table";
import { createContext, useContext } from "react";

// Create generic context
export const DataTableContext = createContext<{
  table: ReturnType<typeof useReactTable<unknown>> | null;
}>({ table: null });

export function useDataTable<T extends RowData>() {
  const context = useContext(DataTableContext);
  if (context === undefined) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context.table as ReturnType<typeof useReactTable<T>> | null;
}
