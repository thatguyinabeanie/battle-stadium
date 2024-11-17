import { Button, useDataTable } from "@battle-stadium/ui";

export function Footer<T>() {
  const table = useDataTable<T>();
  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
