"use client";

import { useState } from "react";
import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

export default function Auction() {
  const [inputText, setInputText] = useState("");
  const [category, setCategory] = useState({
    category: null,
    detailCategory: null,
  });

  return (
    <article className="text-[14px]">
      <SearchBox inputText={inputText} setInputText={setInputText} category={category} setCategory={setCategory} />

      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories category={category} setCategory={setCategory} />
        <ItemLists category={category} inputText={inputText} />
      </div>
    </article>
  );
}
