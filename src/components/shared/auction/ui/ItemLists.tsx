import React, { useMemo, useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { usePathname } from "next/navigation";

import { columns } from "@/utils/auction/tableColumns";

import Paging from "@/components/shared/ui/Paging";
import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";

import useItemOptionStore from "@/store/itemOption-store";

import { Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

type SortingState = Array<{ id: string; desc: boolean }>;

export default function ItemLists({ data }: { data: ItemListsTypes[] | undefined }) {
  const pathName = usePathname();

  const { selectedItemOptions, isFiltered } = useItemOptionStore(state => ({
    selectedItemOptions: state.selectedItemOptions,
    isFiltered: state.isFiltered,
  }));

  const filteredData = useMemo(() => {
    return isFiltered
      ? data?.filter((item: any) => selectedItemOptions.every(option => option?.calcFunc?.(item)))
      : data;
  }, [isFiltered, data, selectedItemOptions]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: filteredData || [],
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
    <Card>
      <CardContent className="flex flex-col justify-between h-full">
        <Table className="w-full">
          <colgroup>
            <col width="35%" />
            <col width="20%" />
            <col />
            <col width="35%" />
          </colgroup>

          <DataTableHead table={table} />

          <DataTableBody table={table} />
        </Table>

        <Paging table={table} />
      </CardContent>
    </Card>
  );
}
