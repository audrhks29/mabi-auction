"use client";

import { useQuestDetail } from "@/hooks/open-quest/useQuestDetail";
import Image from "next/image";
import Tag from "./Tag";
import { CircleUserIcon, Clock, Heart, User } from "lucide-react";
import CreatorInfo from "./CreatorInfo";
import { useState } from "react";

export default function QuestDetailIndex({ params }: { params: { id: string } }) {
  const { data }: { data: QuestDetailTypes } = useQuestDetail(params.id);
  const match = data && data.image_url.match(/openquest\/([^/]+)$/);
  console.log(data);

  if (data?.error?.name) {
    return <div>에러입니다.</div>;
  }

  return (
    <section>
      <h3 className="text-[18px] text-center font-bold pb-6">OPEN QUEST</h3>

      <div className="divider m-0 p-0 before:bg-neutral-content after:bg-neutral-content"></div>

      {data && !data.error && (
        <div className="flex gap-3">
          <div className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] flex flex-col gap-1">
            <ImageContainer match={match} title={data.title} />
            <CountContainer challenger_count={data.challenger_count} like_count={data.like_count} />

            <div className="border-2 quest-custom-border p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center font-bold">
              <Clock />
              도전기간 {data.challenge_period}일
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Tag tag={data.tags} />
            <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] font-bold">
              {data.title}
            </p>
            <div className="flex gap-1 items-center">
              <CircleUserIcon />
              <CreatorInfo name={data.creator_character_name} server={data.creator_server_name} />
            </div>
            <ul></ul>
          </div>
        </div>
      )}
    </section>
  );
}

function ImageContainer({ match, title }: { match: RegExpMatchArray | null; title: string }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative aspect-[9/6] overflow-hidden w-full">
      {match && (
        <Image
          src={`https://openquest-image.nexon.com/${match[1]}`}
          fill
          sizes="100%"
          className={`transition-transform duration-300 ease-in-out group-hover:scale-110`}
          style={{ objectFit: "cover" }}
          alt={title}
          unoptimized
          onLoad={() => setIsImageLoaded(true)}
        />
      )}
      {!isImageLoaded && <div className="skeleton w-full aspect-[9/6]"></div>}
    </div>
  );
}

function CountContainer({ challenger_count, like_count }: { challenger_count: number; like_count: number }) {
  return (
    <div className="relative grid grid-cols-[1fr_1px_1fr]">
      <div className="p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center">
        <User />
        {challenger_count.toLocaleString()}
      </div>
      <div className="divider divider-horizontal p-0 m-0 after:bg-neutral-content before:bg-neutral-content py-3"></div>
      <div className="p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center">
        <Heart />
        {like_count.toLocaleString()}
      </div>
    </div>
  );
}
