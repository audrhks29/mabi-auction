"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">경매장</h3>

      <article>
        <SearchBox
          data={data}
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
