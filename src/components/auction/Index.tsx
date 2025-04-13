"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuctionItemLists } from "@/hooks/auction/useAuctionItemLists";

import SearchBox from "@/components/shared/auction/ui/SearchBox";

import SideBarCategory from "@/components/shared/auction/ui/category/SideBarCategory";
import DataContainer from "../shared/auction/ui/DataContainer";

export default function AuctionIndex() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateTypes>({
    category: null,
    detailCategory: null,
  });

  const inputText = getValues().inputText === "" ? null : getValues().inputText;
  const detailCategory = inputText ? null : category.detailCategory;

  const { data, isFetching }: { data: AuctionTypes; isFetching: boolean } = useAuctionItemLists(
    inputText,
    detailCategory,
  );

  return (
    <article className="grid gap-3">
      <SearchBox
        data={data?.auction_item || data?.auction_history}
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        register={register}
        setValue={setValue}
      />

      <div className="md:grid md:grid-cols-[200px_1fr] md:gap-3">
        <SideBarCategory setCategory={setCategory} setValue={setValue} />

        <DataContainer data={data} isFetching={isFetching} />
      </div>
    </article>
  );
}
