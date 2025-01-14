import { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import itemCategories from "@/assets/auction/itemCategories.json";

export default function ItemCategories({
  setCategory,
  setValue,
  className,
  toggleCategoriesVisibility,
}: {
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
  className: string;
  toggleCategoriesVisibility?: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <ul tabIndex={0} className={`${className} menu bg-base-200 overflow-y-scroll block`}>
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
                    setActiveCategory(detail.detail_category_id);
                    toggleCategoriesVisibility();
                  }}>
                  <a className={`${activeCategory === detail.detail_category_id ? "active" : ""}`}>
                    {detail.detail_category_name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  );
}
