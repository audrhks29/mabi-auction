import { Row } from "@tanstack/react-table";

import useUserDataStore from "@/store/userData-store";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import convertToKoreanUnits from "@/utils/convertToKoreanUnits";
import ItemOptions from "./ItemOptions";
export default function ItemDetail({ row }: { row: Row<ItemListsTypes> }) {
  const userData = useUserDataStore(state => state.userData);

  const addData = async () => {
    const data = row.original;

    const response = await fetch("/api/auction/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!userData) {
      alert("로그인 후 가능한 기능입니다.");
    }

    if (response.status === 201) {
      alert("즐겨찾기에 등록되었습니다.");
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px] text-[14px]">
      <DialogHeader>
        <DialogTitle className="text-center">아이템 상세정보</DialogTitle>
      </DialogHeader>

      <Separator />

      <div>
        <div className="text-center text-[16px] font-semibold">
          <h4>{row.original.item_display_name}</h4>
        </div>

        <div className="flex gap-3 items-center">
          <p>판매 수량 : {row.original.item_count}</p>
        </div>

        <Separator />

        <div>
          <p>판매가 : {convertToKoreanUnits(row.original.item_count * row.original.auction_price_per_unit)} Gold</p>
          <p>개당 : {convertToKoreanUnits(row.original.auction_price_per_unit)} Gold</p>
        </div>

        <Separator />

        <ItemOptions options={row.original.item_option} />

        <div>
          <Button type="button">내 경매 등록</Button>
          <Button type="button" onClick={addData}>
            즐겨찾기 등록
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
