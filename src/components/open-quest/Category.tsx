import { Dispatch, SetStateAction } from "react";

import categoryArray from "@/assets/open-quest/category.json";

import { Button } from "@/components/ui/button";

export default function Category({ setCategory }: { setCategory: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categoryArray.map(arr => (
        <Button type="button" key={arr.id} onClick={() => setCategory(arr.category)}>
          {arr.text}
        </Button>
      ))}
    </div>
  );
}
