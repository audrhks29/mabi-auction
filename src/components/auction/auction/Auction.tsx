"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Categories from "./Categories";
import ItemLists from "./ItemLists";
import SearchBox from "./SearchBox";
import { useForm } from "react-hook-form";

export default function Auction() {
  const { handleSubmit, register, getValues, setValue, watch } = useForm<AuctionSearchFormTypes>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [category, setCategory] = useState({
    category: null,
    detailCategory: null,
  });

  // const aa = async () => {
  //   // https://mabiapi2.pril.cc/prilus.mabiapi/ItemJson
  //   const urlString = `https://tacask-cdn.com/mabi-labanyu/content/item/all-list.json`;
  //   const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  //   try {
  //     const res = await fetch(urlString);

  //     const resData = await res.json();
  //     // console.log(res);
  //     console.log(resData);
  //     // return resData;
  //   } catch (error) {
  //     console.error("An unexpected error happened:", error);
  //   }
  // };
  // useEffect(() => {
  //   aa();
  // }, []);

  const fetchItemLists = async () => {
    const inputText = getValues().inputText;
    const inputTextEncoded = encodeURI(inputText);

    if (inputText !== "") {
      const urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${inputTextEncoded}`;
      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
      try {
        const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};

        const res = await fetch(urlString, {
          headers,
        });

        const resData = await res.json();
        // console.log(res);
        // console.log(resData);
        return resData;
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    } else {
      return [];
    }
  };

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["itemLists", getValues().inputText],
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
        setSearchKeyword={setSearchKeyword}
        refetch={refetch}
        handleSubmit={handleSubmit}
        register={register}
        getValues={getValues}
        setValue={setValue}
      />

      <div className="grid grid-cols-[200px_auto] gap-3">
        <Categories category={category} setCategory={setCategory} />
        {!isFetching && data?.length > 0 && <ItemLists data={data} category={category} searchKeyword={searchKeyword} />}
      </div>
    </article>
  );
}
