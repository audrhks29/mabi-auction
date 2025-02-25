import React from "react";
import { Row } from "@tanstack/react-table";

import { useUserData } from "@/hooks/auth/useUserData";

import convertToKoreanUnits from "@/utils/convertToKoreanUnits";
import { handleAddData } from "@/utils/auction/my-auction/myAuctionHandler";

import ItemDescription from "./ItemDescription";

export default function ItemDetail({ row }: { row: Row<ItemListsTypes> }) {
  const { data: userData, refetch } = useUserData();

  return (
    <dialog id={`itemDetail_modal_${row.id}`} className="modal">
      <div className="modal-box">
        <div className="text-center text-[15px] font-bold">
          <h4>{row.original.item_display_name}</h4>
        </div>

        <div className="text-right px-3 py-2">
          <span className="font-bold">판매 수량&nbsp;&nbsp;</span>
          <span>{row.original.item_count}</span>
        </div>

        <div className="divider m-0"></div>

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

        <div className="divider m-0"></div>

        <ItemDescription options={row.original.item_option} />

        <article className="flex justify-center gap-6">
          <button className="btn" type="button" onClick={() => handleAddData(userData, row, refetch)}>
            내 경매 등록
          </button>

          <button
            className="btn"
            type="button"
            onClick={() => {
              alert("개발중인 기능입니다.");
            }}>
            즐겨찾기 등록
          </button>
        </article>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
