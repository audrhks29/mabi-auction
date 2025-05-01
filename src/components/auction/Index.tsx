"use client";

import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { usePathname } from "next/navigation";

import { useAuctionItemLists } from "@/hooks/auction/useAuctionItemLists";

import SideBarCategory from "@/components/shared/auction/ui/category/SideBarCategory";
import SearchBox from "@/components/shared/auction/ui/SearchBox";
import DataContainer from "@/components/shared/auction/ui/DataContainer";

import useItemSearchStore from "@/store/itemSearch-store";

export default function AuctionIndex() {
  const { submitInputText, submitSearchOption, category, initialAll } = useItemSearchStore(state => ({
    submitInputText: state.submitInputText,
    submitSearchOption: state.submitSearchOption,
    category: state.category,
    initialAll: state.initialAll,
  }));

  const methods = useForm<AuctionSearchFormTypes>();

  const pathName = usePathname();

  useEffect(() => {
    initialAll();
  }, [initialAll, pathName]);

  const { data, isFetching }: { data: AuctionTypes; isFetching: boolean } = useAuctionItemLists(
    submitInputText,
    category.detailCategory,
    submitSearchOption,
  );

  return (
    <article className="grid gap-3">
      <FormProvider {...methods}>
        <SearchBox data={data} isFetching={isFetching} />

        <div className="md:grid md:grid-cols-[200px_1fr] md:gap-3">
          <SideBarCategory />

          <DataContainer data={data} isFetching={isFetching} />
        </div>
      </FormProvider>
    </article>
  );
}
