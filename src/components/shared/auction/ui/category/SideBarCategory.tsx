import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

import ItemCategories from "./ItemCategories";

export default function SideBarCategory({
  setCategory,
  setValue,
}: {
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  return (
    <section className="hidden lg:block">
      <ItemCategories setCategory={setCategory} setValue={setValue} className="h-[655px]" />
    </section>
  );
}
