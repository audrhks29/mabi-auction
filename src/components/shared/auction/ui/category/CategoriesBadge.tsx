import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import useItemSearchStore from "@/store/itemSearch-store";

export default function CategoriesBadge() {
  const { category, setCategory } = useItemSearchStore(state => ({
    category: state.category,
    setCategory: state.setCategory,
  }));

  if (category.category === null && category.detailCategory === null) {
    return (
      <div className="flex gap-2">
        <Badge variant="secondary">카테고리 없음</Badge>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Badge variant="secondary">{category?.category}</Badge>
      <Badge variant="secondary">{category.detailCategory}</Badge>
      <X size={20} onClick={() => setCategory(null, null)} className="cursor-pointer" />
    </div>
  );
}
