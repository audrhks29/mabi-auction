import React, { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ItemDetail from "./ItemDetail";
import Pagination from "@/components/shared/ui/Pagination";

import { columns } from "@/utils/auction/tableColumns";

import useItemOptionStore from "@/store/itemOption-store";
import { usePathname } from "next/navigation";

type SortingState = Array<{ id: string; desc: boolean }>;

export default function ItemLists({ data }: { data: ItemListsTypes[] }) {
  const pathName = usePathname();

  const { selectedItemOptions, isFiltered } = useItemOptionStore(state => ({
    selectedItemOptions: state.selectedItemOptions,
    isFiltered: state.isFiltered,
  }));

  const filteredData = useMemo(() => {
    return isFiltered
      ? data.filter((item: any) => selectedItemOptions.every(option => option?.calcFunc?.(item)))
      : data;
  }, [isFiltered, data, selectedItemOptions]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: filteredData,
    columns: columns(pathName),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section className="flex flex-col justify-between">
      <table className="table table-xs md:table-sm">
        <colgroup>
          <col width="35%" />
          <col width="20%" />
          <col />
          <col width="35%" />
        </colgroup>

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-center">
          {table?.getRowModel()?.rows?.map(row => (
            <React.Fragment key={row.id}>
              <tr
                className="cursor-pointer hover:bg-base-200"
                onClick={() =>
                  (document.getElementById(`itemDetail_modal_${row.id}`) as HTMLDialogElement).showModal()
                }>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {table?.getRowModel()?.rows?.map(row => <ItemDetail row={row} key={row.id} />)}
      <Pagination table={table} />
    </section>
  );
}
