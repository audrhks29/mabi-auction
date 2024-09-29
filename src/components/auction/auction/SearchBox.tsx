import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import itemCategories from "@/assets/auction/itemCategories.json";
import { useState } from "react";

export default function SearchBox({ category, setCategory, setSearchKeyword }) {
  const [inputText, setInputText] = useState("");

  const detailCategoryName = itemCategories
    .find(item => item.category_name === category.category)
    ?.detail_category.find(item => item.detail_category_id === category.detailCategory)?.detail_category_name;

  return (
    <section className="grid grid-rows-2 gap-1 pb-2">
      <div className="grid grid-cols-[auto_120px] gap-2">
        <Input
          type="text"
          placeholder="아이템 이름을 입력하세요."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <Button type="submit" className="w-28" onClick={() => setSearchKeyword(inputText)}>
          찾기
        </Button>
      </div>

      <div className="grid grid-cols-[auto_120px] gap-2 items-center">
        <div>
          {category.category && category.detailCategory && (
            <span className="ml-3">
              {category.category} {">"} {detailCategoryName}
            </span>
          )}
        </div>
        <Button
          type="button"
          className="w-28"
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
