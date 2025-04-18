import ItemDescription from "@/components/shared/auction/ui/ItemDescription";

import { Separator } from "@/components/ui/separator";

type PropsTypes = {
  item: NpcItemsTypes;
  idx: number;
};

export default function NpcItemModal({ item, idx }: PropsTypes) {
  return (
    <div>
      <article className="p-1">
        <div className="flex justify-between">
          <span className="font-bold">판매가</span>
          <span>
            {item.price.map((price, index) => (
              <span key={index}>
                {price.price_value.toLocaleString()}&nbsp;
                {price.price_type}
              </span>
            ))}
          </span>
        </div>
      </article>

      <Separator />

      <ItemDescription options={item.item_option} />
    </div>
  );
}
