import { Dispatch, SetStateAction } from "react";
import categoryArray from "@/assets/open-quest/category.json";
export default function Category({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categoryArray.map(arr => (
        <button
          type="button"
          key={arr.id}
          className={`btn btn-xs sm:btn-sm md:btn-md text-[14px] font-bold ${category === arr.category ? "btn-primary" : "btn-neutral"}`}
          onClick={() => setCategory(arr.category)}>
          {arr.text}
        </button>
      ))}
    </div>
  );
}
