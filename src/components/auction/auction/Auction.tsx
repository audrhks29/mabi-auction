"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

import NonData from "@/components/shared/NonData";

import { fetchItemLists } from "@/services/auctionApi";

export default function Auction() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateType>({
    category: null,
    detailCategory: null,
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["itemLists", getValues().inputText || category.detailCategory],
    queryFn: () => fetchItemLists(getValues, category),
    select: data => {
      return data.auction_item;
    },
  });

  return (
    <article className="text-[14px]">
      <SearchBox
        category={category}
        setCategory={setCategory}
        refetch={refetch}
        handleSubmit={handleSubmit}
        register={register}
        getValues={getValues}
        setValue={setValue}
      />

      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories category={category} setCategory={setCategory} refetch={refetch} setValue={setValue} />
        {!isFetching && data?.length > 0 && <ItemLists data={data} />}
        {data?.length === 0 && <NonData />}
      </div>
    </article>
  );
}
