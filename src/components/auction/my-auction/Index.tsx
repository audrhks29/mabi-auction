"use client";

import React, { useState } from "react";

import { useQueries } from "@tanstack/react-query";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/utils/auction/my-auction/tableColumns";
import { handleDeleteData } from "@/utils/auction/my-auction/myAuctionHandler";

import Pagination from "@/components/shared/ui/Pagination";
import ItemDetail from "@/components/shared/auction/ui/ItemDetail";

import { useUserData } from "@/hooks/auth/useUserData";

export default function MyAuctionIndex() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { data: userData, refetch } = useUserData();

  const auctionData = useQueries({
    queries:
      userData?.my_auction?.map((userMyAuctionData: ItemListsTypes) => ({
        queryKey: ["itemLists", userMyAuctionData.item_name],
        queryFn: async () => {
          if (!userMyAuctionData.item_name) return null;
          else {
            const response = await fetch(
              `/api/auction?inputText=${userMyAuctionData.item_name}&detailCategory=${null}`,
            );
            if (!response.ok) {
              throw new Error("Failed to fetch item lists");
            }
            return response.json();
          }
        },
        select: (data: any) => {
          return (
            data?.some(
              (item: any) =>
                item.item_name === userMyAuctionData.item_name &&
                item.date_auction_expire === userMyAuctionData.date_auction_expire &&
                item.auction_price_per_unit === userMyAuctionData.auction_price_per_unit,
            ) ?? []
          );
        },
      })) ?? [],
  });

  const updatedAuctionData = auctionData.map(item => item.data);

  const table = useReactTable({
    data: userData?.my_auction ?? [],
    columns: columns(updatedAuctionData as boolean[]),
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">내 경매</h3>
      <span className="text-[14px] pb-3">거래 완료 여부는 최근 1시간만 조회가 가능합니다.</span>
      <table className="table table-xs md:table-sm">
        <colgroup>
          <col />
          <col width="10%" />
          <col width="35%" />
          <col width="20%" />
          <col />
          <col width="30%" />
        </colgroup>

        <thead>
          {table?.getHeaderGroups()?.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {table.getRowModel.length > 0 && (
          <tbody className="text-center">
            {table?.getRowModel()?.rows?.map(row => (
              <React.Fragment key={row.id}>
                <tr
                  className="cursor-pointer hover:bg-base-200"
                  onClick={() =>
                    (document.getElementById(`itemDetail_modal_${row.id}`) as HTMLDialogElement).showModal()
                  }>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        )}
      </table>
      {/* {table?.getRowModel()?.rows?.map(row => <ItemDetail row={row} key={row.id} />)} */}
      <div className="ml-auto">
        <button
          type="button"
          className="btn btn-neutral mt-4"
          onClick={() => handleDeleteData(table, userData, setRowSelection, refetch)}>
          선택 항목 삭제
        </button>
      </div>
      {/* <Pagination table={table} /> */}
    </section>
  );
}
