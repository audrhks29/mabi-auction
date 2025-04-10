import React from "react";
import { usePathname } from "next/navigation";
import { Row } from "@tanstack/react-table";

import { useUserData } from "@/hooks/auth/useUserData";

import convertToKoreanUnits from "@/utils/convertToKoreanUnits";
import { handleAddData } from "@/utils/auction/my-auction/myAuctionHandler";

import ItemDescription from "./ItemDescription";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ItemDetailDialog({ row }: { row: Row<ItemListsTypes> }) {
  const { data: userData, refetch } = useUserData();
  const pathName = usePathname();
  const isMyAuctionPage = pathName.includes("my-auction");

  return (
    <div>
      <div className="text-right px-3 py-2">
        <span className="font-bold">판매 수량&nbsp;&nbsp;</span>
        <span>{row.original.item_count}</span>
      </div>

      <Separator />

      <article className="p-1">
        <div className="flex justify-between">
          <span className="font-bold">판매가</span>
          <span>{convertToKoreanUnits(row.original.item_count * row.original.auction_price_per_unit)} Gold</span>
        </div>

        <div className="flex justify-between">
          <span className="font-bold">개당</span>
          <span>{convertToKoreanUnits(row.original.auction_price_per_unit)} Gold</span>
        </div>
      </article>

      <Separator />

      <ItemDescription options={row.original.item_option} />

      {!isMyAuctionPage && (
        <div className="flex justify-end mt-3">
          <Button type="button" onClick={() => handleAddData(userData, row, refetch)}>
            내 경매 등록
          </Button>
        </div>
      )}
    </div>
  );
}
