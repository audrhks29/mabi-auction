import { Dispatch } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/utils/bighornofshout/tableColumns";

export const useBigHornOfShoutListsTable = (data: HornTypes, columnFilters: any, setColumnFilters: Dispatch<any>) => {
  const table = useReactTable({
    data: data?.horn_bugle_world_history,
    columns: columns(columnFilters),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
      },
    },
  });

  return { table };
};
