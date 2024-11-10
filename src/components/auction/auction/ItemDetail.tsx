import { Row } from "@tanstack/react-table";

import useUserDataStore from "@/store/userData-store";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

    // if (!userData) {
    //   alert("로그인 후 가능한 기능입니다.");
    // }

    // if (response.status === 201) {
    //   alert("즐겨찾기에 등록되었습니다.");
    // }
    alert("개발중인 기능입니다.");
  };

  return (
    <DialogContent className="sm:max-w-[425px] text-[14px]">
      <DialogHeader>
        <DialogTitle className="text-center">아이템 상세정보</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <Separator />

      <section>
        <div className="text-center text-[15px] font-bold">
          <h4>{row.original.item_display_name}</h4>
        </div>

        <div className="text-right px-3 py-2">
          <span className="font-bold">판매 수량&nbsp;&nbsp;</span>
          <span>{row.original.item_count}</span>
        </div>

        <Separator />

        <article className="px-3 py-2">
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

        <ItemOptions options={row.original.item_option} />

        <article className="flex justify-center gap-6">
          <Button
            type="button"
            onClick={() => {
              alert("개발중인 기능입니다.");
            }}>
            내 경매 등록
          </Button>
          <Button type="button" onClick={addData}>
            즐겨찾기 등록
          </Button>
        </article>
      </section>
    </DialogContent>
  );
}
