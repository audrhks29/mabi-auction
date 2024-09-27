import { useState } from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import itemCategories from "@/assets/auction/itemCategories.json";

function CategoryBar({ category_name, detail_category, category, setCategory }) {
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
                  className={`${category.detailCategory === detail_category_id ? "font-bold" : ""} cursor-pointer hover:font-bold`}
                  onClick={() => setCategory({ category: category_name, detailCategory: detail_category_id })}>
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

export default function Categories({ category, setCategory }) {
  return (
    <ScrollArea className="">
      <Card className="p-3">
        {itemCategories.map(item => (
          <CategoryBar
            key={item.category_id}
            category_name={item.category_name}
            detail_category={item.detail_category}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </Card>
    </ScrollArea>
  );
}
