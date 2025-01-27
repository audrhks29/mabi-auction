import React from "react";

import { flexRender, Table } from "@tanstack/react-table";

import NonData from "../shared/NonData";
import Loading from "../shared/Loading";
import Pagination from "@/components/shared/ui/Pagination";

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
      <table className="table table-xs md:table-sm">
        <thead className="text-center">
          {table?.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {
          <tbody>
            {isFetching ? (
              <tr className="border-b-0 h-[150px]">
                <td colSpan={3}>
                  <Loading />
                </td>
              </tr>
            ) : data ? (
              table?.getRowModel()?.rows?.map(row => (
                <tr key={row.id} className="cursor-pointer hover:bg-base-200">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="border-b-0 h-[150px]">
                <td colSpan={3}>
                  <NonData />
                </td>
              </tr>
            )}
          </tbody>
        }
      </table>

      {data && <Pagination table={table} />}
    </section>
  );
}
