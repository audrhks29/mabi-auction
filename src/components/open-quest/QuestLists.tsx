"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Tag from "./questDetail/Tag";
import CreatorInfo from "./questDetail/CreatorInfo";
import { useImageLoader } from "@/hooks/npc-shop/useImageLoader";

export default function QuestLists({ data, category }: { data: QuestTypes[]; category: string }) {
  const route = useRouter();

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {data?.map((quest, index) => {
        const match = quest.image_url.match(/openquest\/([^/]+)$/);

        return (
          <li
            key={quest.quest_id}
            className="group w-[240px] mx-auto gap-2 cursor-pointer border quest-custom-border "
            onClick={() => route.push(`/open-quest/${quest.quest_id}`)}>
            <div className="relative w-full aspect-[9/6] bg-base-300 overflow-hidden rounded-t-lg">
              {match && (
                <Image
                  src={`https://openquest-image.nexon.com/${match[1]}`}
                  fill
                  sizes="100%"
                  className={`"transition-transform duration-300 ease-in-out group-hover:scale-110"}`}
                  style={{ objectFit: "cover" }}
                  alt={quest.title}
                  unoptimized
                  loading="eager"
                  onLoad={() => console.log(index)}
                />
              )}
              {/* {!allImagesLoaded && totalImages > 0 && <div className="skeleton w-full h-full"></div>} */}
            </div>

            <div className="p-2 flex flex-col gap-2">
              <p className="text-[14px] group-hover:link font-bold">{quest.title}</p>
              <CreatorInfo name={quest.creator_character_name} server={quest.creator_server_name} />

              <Tag tag={quest.tags} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
