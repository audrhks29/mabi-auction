import Image from "next/image";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ItemDetail({ row }) {
  return (
    <DialogContent className="sm:max-w-[425px] text-[14px]">
      <DialogHeader>
        <DialogTitle>아이템 상세정보</DialogTitle>
      </DialogHeader>

      <Separator />

      <div>
        <div className="text-center">
          <h4>{row.original.textName1}</h4>
          <h3>{row.original.textName0}</h3>
        </div>

        <div className="flex gap-3 items-center">
          <div className="w-14 h-20 flex justify-center items-center border">
            <Image src={row.original.img} width={50} height={50} alt={row.original.textName1} />
          </div>
          <div>
            <p>평균 판매가 : </p>
            <p>등록 최저가 : </p>
            <p>판매 수량 : {row.original.amount}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p>판매가 : {(row.original.amount * row.original.cost).toLocaleString()} Gold</p>

          <p>개당 : {row.original.cost.toLocaleString()} Gold</p>
        </div>

        <div>
          <Button type="button">내 경매 등록</Button>
          <Button type="button">즐겨찾기 등록</Button>
          <Button type="button">닫기</Button>
        </div>
      </div>
    </DialogContent>
  );
}
