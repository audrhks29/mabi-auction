import { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import itemCategories from "@/assets/auction/itemCategories.json";

export default function Categories({
  category,
  setCategory,
  setValue,
}: {
  category: ItemCategoryStateTypes;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  return (
    <section>
      <ul className="menu bg-base-200 max-h-[602px] overflow-y-scroll block">
        {itemCategories.map(category => (
          <li key={category.category_id}>
            <details>
              <summary>{category.category_name}</summary>

              <ul>
                {category.detail_category.map(detail => (
                  <li
                    key={detail.detail_category_id}
                    onClick={() => {
                      setValue("inputText", "");
                      setCategory({ category: category.category_name, detailCategory: detail.detail_category_name });
                    }}>
                    <a>{detail.detail_category_name}</a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
