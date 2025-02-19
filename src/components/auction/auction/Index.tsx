"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuctionItemLists } from "@/hooks/auction/useAuctionItemLists";

import ItemLists from "@/components/shared/auction/ui/ItemLists";
import SearchBox from "@/components/shared/auction/ui/SearchBox";
import NonData from "@/components/shared/NonData";
import Loading from "@/components/shared/Loading";
import SideBarCategory from "@/components/shared/auction/ui/category/SideBarCategory";

export default function AuctionIndex() {
  const { handleSubmit, register, getValues, setValue } = useForm<AuctionSearchFormTypes>();
  const [category, setCategory] = useState<ItemCategoryStateTypes>({
    category: null,
    detailCategory: null,
  });

  const inputText = getValues().inputText === "" ? null : getValues().inputText;
  const detailCategory = inputText ? null : category.detailCategory;

  const { data, isFetching } = useAuctionItemLists("itemLists", "auction", inputText, detailCategory);

  return (
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">경매장</h3>

      <article>
        <SearchBox
          data={data}
          category={category}
          setCategory={setCategory}
          handleSubmit={handleSubmit}
          register={register}
          setValue={setValue}
        />

        <div className="divider m-0"></div>

        <div className="lg:grid lg:grid-cols-[200px_auto] lg:gap-3">
          <SideBarCategory setCategory={setCategory} setValue={setValue} />
          {!isFetching && data && data?.length > 0 && <ItemLists data={data} />}
          {!isFetching && (data?.length === 0 || !data) && <NonData />}
          {isFetching && <Loading />}
        </div>
      </article>
    </section>
  );
}
