"use client";

import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";

import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as ReactTableType,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/utils/auction/my-auction/tableColumns";
import { handleDeleteData } from "@/utils/auction/my-auction/myAuctionHandler";

import { useUserData } from "@/hooks/auth/useUserData";

import DataTableHead from "@/components/shared/ui/DataTableHead";
import DataTableBody from "@/components/shared/ui/DataTableBody";
import NeedLogin from "@/components/shared/NeedLogin";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FetchingData, NonData } from "@/components/shared/DataState";

export default function MyAuctionIndex() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const {
    data: userData,
    refetch,
    isFetching,
  }: { data: UserDataTypes; refetch: any; isFetching: boolean } = useUserData();

  // 경매장에 있는 매물인지 확인
  const auctionData = useQueries({
    queries: userData?.my_auction
      ? userData?.my_auction?.map((userMyAuctionData: ItemListsTypes) => ({
          queryKey: ["itemLists", userMyAuctionData.item_name],
          queryFn: async () => {
            if (!userMyAuctionData.item_name) return null;

            const response = await fetch(
              `/api/auction?inputText=${userMyAuctionData.item_name}&detailCategory=${null}`,
            );
            if (!response.ok) throw new Error("Failed to fetch item lists");
            return response.json();
          },
          select: (data: any) => {
            return (
              data?.auction_item.some(
                (item: any) =>
                  item.item_name === userMyAuctionData.item_name &&
                  item.date_auction_expire === userMyAuctionData.date_auction_expire &&
                  item.auction_price_per_unit === userMyAuctionData.auction_price_per_unit,
              ) ?? []
            );
          },
        }))
      : [],
  });

  // 업데이트
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
      <h3 className="text-[18px] font-bold pb-6">내 경매</h3>

      <DataTable isFetching={isFetching} userData={userData} updatedAuctionData={updatedAuctionData} table={table} />

      <div className="flex justify-end">
        <Button
          type="button"
          className="mt-4"
          onClick={() => handleDeleteData(table, userData, setRowSelection, refetch)}>
          선택 항목 삭제
        </Button>
      </div>
    </section>
  );
}

function DataTable({
  isFetching,
  userData,
  updatedAuctionData,
  table,
}: {
  isFetching: boolean;
  userData: UserDataTypes;
  updatedAuctionData: any[];
  table: ReactTableType<any>;
}) {
  if (isFetching) return <FetchingData />;
  if (!userData) return <NeedLogin />;
  if (updatedAuctionData.length === 0 || !updatedAuctionData) return <NonData cn="h-[500px] lg:h-auto" />;
  return (
    <Table>
      <colgroup>
        <col />
        <col width="10%" />
        <col width="25%" />
        <col />
        <col />
        <col width="25%" />
      </colgroup>

      <DataTableHead table={table} />

      <DataTableBody table={table} />
    </Table>
  );
}
