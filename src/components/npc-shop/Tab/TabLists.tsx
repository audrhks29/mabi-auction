import React from "react";
import Image from "next/image";

import NpcItemModal from "./NpcItemModal";

import { useImageLoader } from "@/hooks/npcShop/useImageLoader";

type PropsTypes = {
  data: NpcTypes;
  tabNumber: number;
};

export default function TabLists({ data, tabNumber }: PropsTypes) {
  const { totalImages, allImagesLoaded, handleImageLoad, handleImageError } = useImageLoader(data, tabNumber);

  return (
    <div className={`w-full h-[500px] overflow-y-auto text-center bg-base-200`}>
      <ul className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-3 $`}>
        {data?.shop?.map(
          (shop: NpcShopTypes, index: number) =>
            tabNumber === index &&
            shop.item.map((item, idx) => (
              <React.Fragment key={item.item_display_name + idx}>
                <li
                  className="hover:bg-base-100 rounded-lg cursor-pointer border border-neutral-content dark:border-opacity-10 h-fit"
                  onClick={() => {
                    (
                      document.getElementById(`npc_shop_modal_${item.item_display_name + idx}`) as HTMLDialogElement
                    )?.showModal();
                  }}>
                  <div className="grid grid-cols-[60px_1fr] justify-center items-center border-b border-b-neutral-content dark:border-opacity-10 px-3 py-1">
                    <div className="relative w-[60px] h-[60px] bg-base-300">
                      <Image
                        src={item.image_url}
                        alt={item.item_display_name}
                        fill
                        sizes="100%"
                        style={{ objectFit: "contain" }}
                        className={`${!allImagesLoaded ? "opacity-0" : ""}`}
                        onLoad={() => handleImageLoad(item.image_url)}
                        onError={() => handleImageError(item.image_url)}
                      />
                      {!allImagesLoaded && totalImages > 0 && <div className="skeleton w-[60px] h-[60px]"></div>}
                    </div>
                    <span>{item.item_display_name}</span>
                  </div>

                  <div className="text-right px-2 bg-base-100">
                    {item.price.map((price, index) => (
                      <span key={index}>
                        {price.price_value.toLocaleString()}&nbsp;
                        {price.price_type}
                      </span>
                    ))}
                  </div>
                </li>

                <NpcItemModal item={item} idx={idx} />
              </React.Fragment>
            )),
        )}
      </ul>
    </div>
  );
}
