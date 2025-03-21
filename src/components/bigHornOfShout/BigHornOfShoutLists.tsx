import React, { ReactElement } from "react";
import { Table } from "@tanstack/react-table";

import Pagination from "@/components/shared/ui/Pagination";
import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";
import TableSkeleton from "@/components/bigHornOfShout/TableSkeleton";
import { ErrorData, NonData } from "@/components/shared/DataState";

export default function BigHornOfShoutLists({
  data,
  table,
  isFetching,
}: {
  data: HornTypes;
  table: Table<HornListTypes>;
  isFetching: boolean;
}) {
  // 데이터 패치중
  if (isFetching)
    return (
      <BigHornOfShoutListsContainer table={table} isFetching={isFetching} data={data}>
        <TableSkeleton />
      </BigHornOfShoutListsContainer>
    );

  // API Error
  if (data?.error?.name) {
    return <ErrorData error={data.error} cn="h-[500px]" />;
  }

  // 데이터 없음
  if (data.horn_bugle_world_history.length === 0) return <NonData cn="h-[500px]" />;

  // 데이터 패치 완료 및 데이터 있음
  return (
    <BigHornOfShoutListsContainer table={table} isFetching={isFetching} data={data}>
      <DataTableBody table={table} />
    </BigHornOfShoutListsContainer>
  );
}

function BigHornOfShoutListsContainer({
  children,
  table,
  isFetching,
  data,
}: {
  children: ReactElement;
  table: Table<HornListTypes>;
  isFetching: boolean;
  data: HornTypes;
}) {
  return (
    <section className="flex flex-col gap-3 w-full">
      <table className="table table-xs md:table-sm">
        <colgroup>
          <col width="20%" />
          <col width="20%" />
        </colgroup>

        <DataTableHead table={table} />

        {children}
      </table>

      {!isFetching && data.horn_bugle_world_history.length > 0 && <Pagination table={table} />}
    </section>
  );
}
