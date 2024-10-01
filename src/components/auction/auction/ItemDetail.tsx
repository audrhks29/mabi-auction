import Image from "next/image";

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useUserDataStore from "@/store/userData-store";

export default function ItemDetail({ row }) {
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
          <Button type="button" onClick={addData}>
            즐겨찾기 등록
          </Button>
          <Button type="button">닫기</Button>
        </div>
      </div>
    </DialogContent>
  );
}
