"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";

import { columns } from "@/utils/bighornofshout/tableColumns";
import { serverMap } from "@/utils/serverMap";
import { useBigHornOfShoutLists } from "@/hooks/bighornofshout/useBigHornOfShoutLists";

export default function BigHornOfShoutIndex({ params }: { params: { server: string } }) {
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const { handleSubmit, register, getValues, setValue } = useForm<HornSearchFormTypes>();

  const { data, isFetching } = useBigHornOfShoutLists(params);

  const table = useReactTable({
    data,
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

  return (
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">
        {serverMap[params.server]}서버 뿔피리&nbsp;<span className="badge badge-primary">+ {data?.length}</span>
      </h3>

      <div className="flex gap-1 flex-col justify-center items-center">
        <SearchBox
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          setValue={setValue}
          setColumnFilters={setColumnFilters}
        />

        <div className="divider m-0"></div>

        <BigHornOfShoutLists data={data} table={table} isFetching={isFetching} />
      </div>
    </section>
  );
}
