"use client";

import { useState } from "react";
import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

export default function Auction() {
  const [detailCategory, setDetailCategory] = useState({
    category: null,
    detailCategory: null,
  });

  return (
    <article className="text-[14px]">
      <SearchBox />
      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories detailCategory={detailCategory} setDetailCategory={setDetailCategory} />
        <ItemLists />
      </div>
    </article>
  );
}
