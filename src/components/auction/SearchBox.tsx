import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchBox({ inputText, setInputText, setCategory }) {
  return (
    <section>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="아이템 이름을 입력하세요."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <Button>찾기</Button>
      </div>
      <div>
        <Button
          type="button"
          onClick={() => {
            setInputText("");
            setCategory({ category: null, detailCategory: null });
          }}>
          검색 초기화
        </Button>
      </div>
    </section>
  );
}
