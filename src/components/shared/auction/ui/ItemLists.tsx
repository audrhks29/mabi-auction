import React, { useMemo, useState } from "react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { usePathname } from "next/navigation";

import { columns } from "@/utils/auction/tableColumns";

import ItemDetail from "@/components/shared/auction/ui/ItemDetail";
import Pagination from "@/components/shared/ui/Pagination";
import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";

import useItemOptionStore from "@/store/itemOption-store";

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

        <DataTableHead table={table} />

        <DataTableBody table={table} />
      </table>

      {table?.getRowModel()?.rows?.map(row => <ItemDetail row={row} key={row.id} />)}

      <Pagination table={table} />
    </section>
  );
}
