"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";

import NonData from "@/components/shared/NonData";

export default function Auction() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateType>({
    category: null,
    detailCategory: null,
  });

  const fetchItemLists = async () => {
    const inputText = getValues().inputText;

    if (inputText !== "" || category.detailCategory) {
      let urlString;
      if (category.detailCategory) {
        // 카테고리 클릭시 검색
        const detailCategoryEncoded = encodeURI(category.detailCategory);
        urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?auction_item_category=${detailCategoryEncoded}`;
      } else {
        // 검색어 입력시 검색
        const inputTextEncoded = encodeURI(inputText);
        urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${inputTextEncoded}`;
      }

      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      try {
        const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};

        const res = await fetch(urlString, {
          headers,
        });

        const resData = await res.json();
        return resData;
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    } else {
      return [];
    }
  };

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["itemLists", getValues().inputText || category.detailCategory],
    queryFn: fetchItemLists,
    select: data => {
      return data.auction_item;
    },
  });

  // console.log(data);
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
