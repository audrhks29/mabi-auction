import { useEffect, useState } from "react";

import itemLists from "@/assets/auction/itemLists.json";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDownIcon,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ItemDetail from "./ItemDetail";
import { columns } from "@/utils/auction/tableColumns";
import Pagination from "./Pagination";

type SortingState = Array<{ id: string; desc: boolean }>;

export default function ItemLists({ category, searchKeyword }) {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    let filteredData = [];

    // 검색어만 입력시
    if (searchKeyword && !category.detailCategory) {
      filteredData = itemLists.filter(item => item.textName1.includes(searchKeyword));
    }
    // 카테고리만 클릭시
    else if (searchKeyword === "" && category.detailCategory) {
      filteredData = itemLists.filter(item => item.category_detail === category.detailCategory);
    }
    // 검색어 입력 및 카테고리 클릭
    else if (searchKeyword !== "" && category.detailCategory) {
      filteredData = itemLists.filter(
        item => item.category_detail === category.detailCategory && item.textName1.includes(searchKeyword),
      );
    }
    setData(filteredData);
  }, [category, searchKeyword]);

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
      <Table>
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
          {table.getRowModel().rows.map(row => (
            <Dialog key={row.id}>
              <DialogTrigger asChild>
                <TableRow className="cursor-pointer">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
