"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Tag from "./questDetail/Tag";
import CreatorInfo from "./questDetail/CreatorInfo";

export default function QuestLists({ data }: { data: QuestTypes[] }) {
  const route = useRouter();

  if (!data) return <Skeleton />;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {data?.map(quest => {
        const match = quest.image_url.match(/openquest\/([^/]+)$/);

        return (
          <li
            key={quest.quest_id}
            className="group w-[240px] mx-auto gap-2 cursor-pointer border quest-custom-border"
            onClick={() => route.push(`/open-quest/${quest.quest_id}`)}>
            <div className="relative w-full aspect-[9/6] overflow-hidden rounded-t-lg">
              {match && (
                <Image
                  src={`https://openquest-image.nexon.com/${match[1]}`}
                  fill
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  alt={quest.title}
                  quality={50}
                />
              )}
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

function Skeleton() {
  const listArray = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {listArray.map((_, index) => (
        <li key={index} className="group w-[240px] mx-auto gap-2 cursor-pointer border quest-custom-border">
          <div className="relative w-full aspect-[9/6] overflow-hidden rounded-t-lg">
            <div className="skeleton w-full aspect-[9/6]"></div>
          </div>

          <div className="p-2 flex flex-col gap-2">
            <p className="skeleton w-[120px] h-[21px]"></p>
            <span className="skeleton w-[90px] h-[18px]"></span>
            <span className="skeleton bg-neutral w-[60px] h-[20px]"></span>
          </div>
        </li>
      ))}
    </ul>
  );
}
