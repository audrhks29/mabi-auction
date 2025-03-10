"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";

import { columns } from "@/utils/bighornofshout/tableColumns";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function BigHornOfShoutIndex({ params }: { params: { server: string } }) {
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const { handleSubmit, register, getValues, setValue } = useForm<HornSearchFormTypes>();

  const serverMap: Record<string, string> = {
    lute: "류트",
    mandolin: "만돌린",
    harp: "하프",
    wolf: "울프",
  };

  function server(params: { server: string }): string {
    const serverName = serverMap[params.server] || ""; // 기본값 처리
    return encodeURI(serverName);
  }

  const encodedServerName = server(params);

  const { data, isFetching } = useQuery({
    queryKey: [encodedServerName + "bighornofshout"],
    queryFn: async () => {
      if (encodedServerName !== undefined) {
        const response = await fetch(`/api/bighornofshout?server=${encodedServerName}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
    select: data => {
      return data.horn_bugle_world_history;
    },
  });

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
