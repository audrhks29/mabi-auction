import ItemDescription from "@/components/shared/auction/ui/ItemDescription";

type PropsTypes = {
  item: NpcItemsTypes;
  idx: number;
};

export default function NpcItemModal({ item, idx }: PropsTypes) {
  return (
    <dialog id={`npc_shop_modal_${item.item_display_name + idx}`} className="modal">
      <div className="modal-box">
        <div className="text-center text-[15px] font-bold">
          <h4>{item.item_display_name}</h4>
        </div>

        <div className="divider m-0"></div>

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

        <div className="divider m-0"></div>

        <ItemDescription options={item.item_option} />
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
