import React from "react";

import { Table } from "@tanstack/react-table";

import NonData from "../shared/NonData";
import Loading from "../shared/Loading";
import Pagination from "@/components/shared/ui/Pagination";
import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";

export default function BigHornOfShoutLists({
  data,
  table,
  isFetching,
}: {
  data: HornListTypes[] | [];
  table: Table<HornListTypes>;
  isFetching: boolean;
}) {
  return (
    <section className="flex flex-col gap-3">
      {isFetching ? (
        <Loading />
      ) : data ? (
        <>
          <table className="table table-xs md:table-sm">
            <DataTableHead table={table} />

            <DataTableBody table={table} />
          </table>

          <Pagination table={table} />
        </>
      ) : (
        <NonData />
      )}
    </section>
  );
}
