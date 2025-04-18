import React from "react";
import Image from "next/image";

import NpcItemModal from "./NpcItemModal";

import { useImageLoader } from "@/hooks/npc-shop/useImageLoader";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type PropsTypes = {
  data: NpcTypes;
  tabNumber: number;
};

export default function TabLists({ data, tabNumber }: PropsTypes) {
  const { totalImages, allImagesLoaded, handleImageLoad, handleImageError } = useImageLoader(data.shop, tabNumber);

  return (
    <ScrollArea className="w-full h-[500px] overflow-y-auto text-center">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-3">
        {data?.shop?.map(
          (shop: NpcShopTypes, index: number) =>
            tabNumber === index &&
            shop?.item?.map((item, idx) => (
              <Dialog key={item.item_display_name + idx}>
                <DialogTrigger asChild>
                  <Card className="p-3 cursor-pointer hover:bg-accent">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-[60px_1fr] gap-3 justify-center items-center border-b border-input">
                        <div className={`relative w-[60px] h-[60px] ${allImagesLoaded && "bg-primary/10 rounded-md"}`}>
                          <Image
                            src={item.image_url}
                            alt={item.item_display_name}
                            fill
                            sizes="100%"
                            style={{ objectFit: "contain" }}
                            className={`${!allImagesLoaded ? "opacity-0" : ""}`}
                            onLoad={() => handleImageLoad(item.image_url)}
                            onError={() => handleImageError(item.image_url)}
                            unoptimized
                          />
                          {!allImagesLoaded && totalImages > 0 && <Skeleton className="w-[60px] h-[60px]"></Skeleton>}
                        </div>
                        <span>{item.item_display_name}</span>
                      </div>

                      <div className="text-right px-2 rounded-b-lg">
                        {item.price.map((price, index) => (
                          <span key={index}>
                            {price.price_value.toLocaleString()}&nbsp;
                            {price.price_type}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">{item.item_display_name}</DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                  </DialogHeader>

                  <Separator />

                  <NpcItemModal item={item} idx={idx} />
                </DialogContent>
              </Dialog>
            )),
        )}
      </div>
    </ScrollArea>
  );
}
