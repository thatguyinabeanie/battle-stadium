import { Button, useDataTable } from "@battle-stadium/ui";

export function DataTableFooter<T>() {
  const table = useDataTable<T>();
  if (!table) {
    return null; // Or return a meaningful fallback UI + }
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Go to previous page"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Go to next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
