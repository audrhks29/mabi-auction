"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";

import { serverMap } from "@/utils/serverMap";

import { useBigHornOfShoutLists } from "@/hooks/bighornofshout/useBigHornOfShoutLists";
import { useBigHornOfShoutListsTable } from "@/hooks/bighornofshout/useBigHornOfShoutListsTable";

export default function BigHornOfShoutIndex({ params }: { params: { server: string } }) {
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const { handleSubmit, register, getValues, setValue } = useForm<HornSearchFormTypes>();

  const { data, isFetching }: { data: HornTypes; isFetching: boolean } = useBigHornOfShoutLists(params);
  const { table } = useBigHornOfShoutListsTable(data, columnFilters, setColumnFilters);

  return (
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">
        {serverMap[params.server]}서버 뿔피리&nbsp;
        <span className="badge badge-primary">+ {data?.horn_bugle_world_history?.length}</span>
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
