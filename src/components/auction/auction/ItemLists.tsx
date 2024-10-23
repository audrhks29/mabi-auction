import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import ItemDetail from "./ItemDetail";
import Pagination from "./Pagination";

import { columns } from "@/utils/auction/tableColumns";

type SortingState = Array<{ id: string; desc: boolean }>;

export default function ItemLists({ data }: { data: ItemListsTypes[] }) {
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
    <Card className="p-3">
      <Table className="table-auto w-full">
        <colgroup>
          <col width="520px" />
          <col width="130px" />
          <col width="70px" />
        </colgroup>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table?.getRowModel()?.rows?.map(row => (
            <Dialog key={row.id}>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </DialogTrigger>

              <ItemDetail row={row} />
            </Dialog>
          ))}
        </TableBody>
      </Table>

      <Pagination table={table} />
    </Card>
  );
}
