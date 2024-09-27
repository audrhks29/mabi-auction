import { useState } from "react";
import { Card } from "@/components/ui/card";
import itemCategories from "@/assets/auction/itemCategories.json";
import { ScrollArea } from "../ui/scroll-area";

function CategoryBar({ category_name, detail_category, detailCategory, setDetailCategory }) {
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
          {detail_category.map(category => {
            const { detail_category_id, detail_category_name } = category;

            return (
              <li key={detail_category_id}>
                <span
                  className={`${detailCategory.detailCategory === detail_category_name ? "font-bold" : ""} cursor-pointer hover:font-bold`}
                  onClick={() => setDetailCategory({ category: category_name, detailCategory: detail_category_name })}>
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

export default function Categories({ detailCategory, setDetailCategory }) {
  return (
    <ScrollArea className="">
      <Card className="p-3">
        {itemCategories.map(category => (
          <CategoryBar
            key={category.category_id}
            detailCategory={detailCategory}
            category_name={category.category_name}
            detail_category={category.detail_category}
            setDetailCategory={setDetailCategory}
          />
        ))}
      </Card>
    </ScrollArea>
  );
}
