import { Dispatch, SetStateAction, useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { UseFormSetValue } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import itemCategories from "@/assets/auction/itemCategories.json";

function CategoryBar({
  category_name,
  detail_category,
  category,
  setCategory,
  refetch,
  setValue,
}: {
  category_name: string;
  detail_category: {
    detail_category_id: number;
    detail_category_name: string;
  }[];
  category: ItemCategoryStateType;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateType>>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul>
      <li>
        <span
          className={`${isOpen ? "font-bold" : ""} cursor-pointer hover:font-bold`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          {isOpen ? "-" : "+"} {category_name}
        </span>
      </li>

      {isOpen && (
        <ul className="ml-5">
          {detail_category.map(item => {
            const { detail_category_id, detail_category_name } = item;

            return (
              <li key={detail_category_id}>
                <span
                  className={`${category.detailCategory === detail_category_name ? "font-bold" : ""} cursor-pointer hover:font-bold`}
                  onClick={() => {
                    setValue("inputText", "");
                    setCategory({ category: category_name, detailCategory: detail_category_name });
                    refetch();
                  }}>
                  {detail_category_name}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </ul>
  );
}

export default function Categories({
  category,
  setCategory,
  refetch,
  setValue,
}: {
  category: ItemCategoryStateType;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateType>>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  return (
    <ScrollArea className="max-h-[550px] border rounded-md">
      <Card className="p-3 border-none">
        {itemCategories.map(item => (
          <CategoryBar
            key={item.category_id}
            category_name={item.category_name}
            detail_category={item.detail_category}
            category={category}
            setCategory={setCategory}
            refetch={refetch}
            setValue={setValue}
          />
        ))}
      </Card>
    </ScrollArea>
  );
}
