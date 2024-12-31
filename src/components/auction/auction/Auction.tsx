"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

import NonData from "@/components/shared/NonData";
import Loading from "@/components/shared/Loading";

export default function Auction() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateTypes>({
    category: null,
    detailCategory: null,
  });

  const { data, isFetching } = useQuery({
    queryKey: ["itemLists", getValues().inputText || category.detailCategory],
    queryFn: async () => {
      const inputText = getValues().inputText == "" ? null : getValues().inputText;
      const detailCategory = category.detailCategory;
      if (inputText || category.detailCategory) {
        const response = await fetch(`/api/auction?inputText=${inputText}&detailCategory=${detailCategory}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
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
        <Categories setCategory={setCategory} setValue={setValue} />
        {!isFetching && data && data?.length > 0 && <ItemLists data={data} />}
        {!isFetching && (data?.length === 0 || !data) && <NonData />}
        {isFetching && <Loading />}
      </div>
    </article>
  );
}
