import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

import ItemCategories from "./ItemCategories";

import { Card, CardContent } from "@/components/ui/card";

export default function SideBarCategory({
  setCategory,
  setValue,
}: {
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  return (
    <Card className="hidden md:block overflow-y-auto">
      <CardContent>
        <ItemCategories setCategory={setCategory} setValue={setValue} className="h-[655px]" />
      </CardContent>
    </Card>
  );
}
