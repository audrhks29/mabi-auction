"use client";

import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/utils/auction/my-auction/tableColumns";
import { handleDeleteData } from "@/utils/auction/my-auction/myAuctionHandler";

import ItemDetail from "@/components/shared/auction/ui/ItemDetail";
import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";
import NeedLogin from "@/components/shared/NeedLogin";
import Loading from "@/components/shared/Loading";

import { useUserData } from "@/hooks/auth/useUserData";
import { Table } from "@/components/ui/table";

export default function MyAuctionIndex() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const { data: userData, refetch, isFetching } = useUserData();

  const auctionData = useQueries({
    queries:
      userData?.my_auction?.map((userMyAuctionData: ItemListsTypes) => ({
        queryKey: ["itemLists", userMyAuctionData.item_name],
        queryFn: async () => {
          if (!userMyAuctionData.item_name) return null;
          if (!userMyAuctionData.item_name) return null;
          const response = await fetch(`/api/auction?inputText=${userMyAuctionData.item_name}&detailCategory=${null}`);
          if (!response.ok) throw new Error("Failed to fetch item lists");
          return response.json();
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

      {userData && !isFetching && (
        <>
          <Table>
            <colgroup>
              <col />
              <col width="10%" />
              <col width="35%" />
              <col width="20%" />
              <col />
              <col width="30%" />
            </colgroup>

            <DataTableHead table={table} />

            <DataTableBody table={table} />
          </Table>

          {table?.getRowModel()?.rows?.map(row => <ItemDetail row={row} key={row.id} />)}

          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-neutral mt-4"
              onClick={() => handleDeleteData(table, userData, setRowSelection, refetch)}>
              선택 항목 삭제
            </button>
          </div>
        </>
      )}

      {isFetching && !userData && <Loading />}
      {!userData && !isFetching && <NeedLogin />}
    </section>
  );
}
