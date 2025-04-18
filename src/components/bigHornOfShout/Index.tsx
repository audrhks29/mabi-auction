"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";
import { Separator } from "@/components/ui/separator";

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
      <h3 className="text-[18px] font-bold pb-6">{serverMap[params.server]}서버 뿔피리&nbsp;</h3>

      <div className="grid gap-3">
        <SearchBox
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          setValue={setValue}
          setColumnFilters={setColumnFilters}
        />

        <div>
          <p className="text-right text-[12px] text-card-foreground/60">
            {data?.horn_bugle_world_history?.length || 0}개의 검색결과가 있습니다.
          </p>

          <Separator />
        </div>

        <BigHornOfShoutLists data={data} table={table} isFetching={isFetching} />
      </div>
    </section>
  );
}
