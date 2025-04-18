import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Paging({ table }: { table: Table<ItemListsTypes> | Table<HornListTypes> }) {
  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-2">
        <Button variant="outline" disabled={!table?.getCanPreviousPage()} onClick={() => table?.firstPage()}>
          <ChevronFirst className="w-5 h-5 m-auto" />
        </Button>

        <Button
          variant="outline"
          disabled={!table?.getCanPreviousPage()}
          onClick={() => table?.setPageIndex(table?.getState().pagination.pageIndex - 10)}>
          <ChevronsLeft className="w-5 h-5 m-auto" />
        </Button>

        <Button variant="outline" disabled={!table?.getCanPreviousPage()} onClick={() => table?.previousPage()}>
          <ChevronLeft className="w-5 h-5 m-auto" />
        </Button>

        <div className="flex items-center">
          [&nbsp;{table?.getPageCount() === 0 ? "0" : table?.getState().pagination.pageIndex + 1}&nbsp;/&nbsp;
          {table?.getPageCount()}
          &nbsp;]
        </div>

        <Button variant="outline" disabled={!table?.getCanNextPage()} onClick={() => table?.nextPage()}>
          <ChevronRight className="w-5 h-5 m-auto" />
        </Button>

        <Button
          variant="outline"
          disabled={!table?.getCanNextPage()}
          onClick={() => {
            if (table?.getState().pagination.pageIndex + 10 >= table?.getPageCount()) {
              table?.setPageIndex(table?.getPageCount() - 1);
            } else {
              table?.setPageIndex(table.getState().pagination.pageIndex + 10);
            }
          }}>
          <ChevronsRight className="w-5 h-5 m-auto" />
        </Button>

        <Button variant="outline" disabled={!table?.getCanNextPage()} onClick={() => table?.lastPage()}>
          <ChevronLast className="w-5 h-5 m-auto" />
        </Button>
      </div>
    </div>
  );
}
