"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuctionItemLists } from "@/hooks/auction/useAuctionItemLists";

import ItemLists from "@/components/shared/auction/ui/ItemLists";
import SearchBox from "@/components/shared/auction/ui/SearchBox";
import { ErrorData, FetchingData, NonData } from "@/components/shared/DataState";

import SideBarCategory from "@/components/shared/auction/ui/category/SideBarCategory";
import { Separator } from "@/components/ui/separator";

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
    <section>
      <h3 className="text-[18px] font-bold pb-6">경매장</h3>

      <article className="grid gap-3">
        <SearchBox
          data={data?.auction_item}
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
    </section>
  );
}

function DataContainer({ data, isFetching }: { data: AuctionTypes; isFetching: boolean }) {
  if (isFetching) return <FetchingData cn="h-[460px] lg:h-auto" />;

  if (data?.error?.name) {
    return <ErrorData error={data.error} cn="h-[500px] lg:h-auto" />;
  }

  if (data?.auction_item?.length === 0 || !data) return <NonData cn="h-[500px] lg:h-auto" />;

  return <ItemLists data={data?.auction_item} />;
}
