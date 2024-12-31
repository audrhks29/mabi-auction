import React, { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ItemDetail from "./ItemDetail";
import Pagination from "./Pagination";

import { columns } from "@/utils/auction/tableColumns";

type SortingState = Array<{ id: string; desc: boolean }>;

export default function ItemLists({ data }: { data: ItemListsTypes[] }) {
  // 확인용
  // function getOptionTypes(data: ItemListsTypes[]): string[] {
  //   const optionTypes = Array.from(new Set(data.flatMap(item => item.item_display_name)));
  //   return optionTypes;
  // }
  // console.log(getOptionTypes(data));
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section>
      <table className="table table-sm">
        <colgroup>
          <col width="520px" />
          <col width="130px" />
          <col width="70px" />
        </colgroup>

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="text-center">
          {table?.getRowModel()?.rows?.map(row => (
            <React.Fragment key={row.id}>
              <tr
                className="cursor-pointer"
                onClick={() => (document.getElementById(`my_modal_${row.id}`) as HTMLDialogElement).showModal()}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>

              <ItemDetail row={row} />
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Pagination table={table} />
    </section>
  );
}
