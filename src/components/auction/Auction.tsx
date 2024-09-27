"use client";

import { useState } from "react";
import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

export default function Auction() {
  const [category, setCategory] = useState({
    category: null,
    detailCategory: null,
  });

  return (
    <article className="text-[14px]">
      <SearchBox />
      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories category={category} setCategory={setCategory} />
        <ItemLists category={category} />
      </div>
    </article>
  );
}
