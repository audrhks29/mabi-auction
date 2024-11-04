"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

import NonData from "@/components/shared/NonData";
import Loading from "@/components/shared/Loading";

import { fetchItemLists } from "@/services/auctionApi";

export default function Auction() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateType>({
    category: null,
    detailCategory: null,
  });

  const { data, isFetching } = useQuery({
    queryKey: ["itemLists", getValues().inputText || category.detailCategory],
    queryFn: () => fetchItemLists(getValues, category),
  });

  return (
    <article className="text-[14px]">
      <SearchBox
        category={category}
        setCategory={setCategory}
        handleSubmit={handleSubmit}
        register={register}
        setValue={setValue}
      />

      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories category={category} setCategory={setCategory} setValue={setValue} />
        {!isFetching && data && data?.length > 0 && <ItemLists data={data} />}
        {!isFetching && (data?.length === 0 || !data) && <NonData />}
        {isFetching && <Loading />}
      </div>
    </article>
  );
}
