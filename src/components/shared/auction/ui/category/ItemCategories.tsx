import { Dispatch, SetStateAction, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import itemCategories from "@/assets/auction/itemCategories.json";
import useItemSearchStore from "@/store/itemSearch-store";

export default function ItemCategories({ cn, setOpen }: { cn: string; setOpen?: Dispatch<SetStateAction<boolean>> }) {
  const { activeCategory, openCategoryIds, setCategory, setActiveCategory, setOpenCategoryIds } = useItemSearchStore(
    state => ({
      activeCategory: state.activeCategory,
      openCategoryIds: state.openCategoryIds,
      setCategory: state.setCategory,
      setActiveCategory: state.setActiveCategory,
      setOpenCategoryIds: state.setOpenCategoryIds,
    }),
  );

  const { setValue } = useFormContext<AuctionSearchFormTypes>();

  return (
    <ul className={`${cn} flex flex-col gap-1`}>
      {itemCategories.map(category => {
        const isOpen = openCategoryIds.includes(category.category_id);

        return (
          <li key={category.category_id}>
            <div>
              <summary
                className="cursor-pointer hover:font-bold flex justify-between items-center"
                onClick={() => setOpenCategoryIds(category.category_id)}>
                {category.category_name}
                <ChevronRight size={18} className={`transition-all duration-300 ${isOpen ? "rotate-90" : ""}`} />
              </summary>

              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="px-3 flex flex-col gap-1 my-1 border-l border-l-sidebar-foreground/50">
                  {category.detail_category.map(detail => (
                    <li
                      key={detail.detail_category_id}
                      className={`cursor-pointer hover:font-bold ${activeCategory === detail.detail_category_id ? "border-b border-b-sidebar-foreground/50 font-bold" : ""}`}
                      onClick={() => {
                        setValue("inputText", "");
                        setCategory(category.category_name, detail.detail_category_name);
                        setActiveCategory(detail.detail_category_id);
                        setOpen?.(false);
                      }}>
                      <a>{detail.detail_category_name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
