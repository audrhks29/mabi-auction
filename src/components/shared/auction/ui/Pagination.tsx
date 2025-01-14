import { Table } from "@tanstack/react-table";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({ table }: { table: Table<ItemListsTypes> }) {
  return (
    <div className="flex justify-center items-center text-[14px]">
      <div className="flex gap-1">
        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.firstPage()}>
          <ChevronFirst className="w-5 h-5 m-auto" />
        </button>

        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 10)}>
          <ChevronsLeft className="w-5 h-5 m-auto" />
        </button>

        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}>
          <ChevronLeft className="w-5 h-5 m-auto" />
        </button>

        <div className="translate-y-[2px]">
          [&nbsp;{table.getPageCount() === 0 ? "0" : table.getState().pagination.pageIndex + 1}&nbsp;/&nbsp;
          {table.getPageCount()}
          &nbsp;]
        </div>

        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}>
          <ChevronRight className="w-5 h-5 m-auto" />
        </button>

        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            if (table.getState().pagination.pageIndex + 10 >= table.getPageCount()) {
              table.setPageIndex(table.getPageCount() - 1);
            } else {
              table.setPageIndex(table.getState().pagination.pageIndex + 10);
            }
          }}>
          <ChevronsRight className="w-5 h-5 m-auto" />
        </button>

        <button
          className="w-7 h-7 p-0 rounded-md cursor-pointer hover:bg-base-300"
          disabled={!table.getCanNextPage()}
          onClick={() => table.lastPage()}>
          <ChevronLast className="w-5 h-5 m-auto" />
        </button>
      </div>
    </div>
  );
}
