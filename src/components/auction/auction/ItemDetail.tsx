import React from "react";
import { Row } from "@tanstack/react-table";

import useUserDataStore from "@/store/userData-store";

import convertToKoreanUnits from "@/utils/convertToKoreanUnits";

import ItemOptions from "./ItemOptions";

export default function ItemDetail({ row }: { row: Row<ItemListsTypes> }) {
  const userData = useUserDataStore(state => state.userData);

  // const addData = async () => {
  //   const data = row.original;

  //   const response = await fetch("/api/auction/favorites", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!userData) {
  //     alert("로그인 후 가능한 기능입니다.");
  //   }

  //   if (response.status === 201) {
  //     alert("즐겨찾기에 등록되었습니다.");
  //   }
  //   alert("개발중인 기능입니다.");
  // };

  return (
    <React.Fragment>
      <dialog id={`my_modal_${row.id}`} className="modal">
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

          <ItemOptions options={row.original.item_option} />

          <article className="flex justify-center gap-6">
            <button
              className="btn"
              type="button"
              onClick={() => {
                alert("개발중인 기능입니다.");
              }}>
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
    </React.Fragment>
  );
}
