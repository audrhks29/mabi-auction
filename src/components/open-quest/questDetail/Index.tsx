"use client";

import Image from "next/image";
import { Clock, Heart, User } from "lucide-react";

import Tag from "./Tag";
import CreatorInfo from "./CreatorInfo";
import Rank from "./Rank";
import Mission from "./Mission";
import Title from "./Title";

import { useQuestDetail } from "@/hooks/open-quest/useQuestDetail";

export default function Index({ params }: { params: { id: string } }) {
  const { data }: { data: QuestDetailTypes } = useQuestDetail(params.id);
  const match = data?.image_url?.match(/openquest\/([^/]+)$/);

  if (data?.error?.name) {
    return <div>에러입니다.</div>;
  }

  return (
    <section className="text-[12px] md:text-[14px]">
      <h3 className="text-[18px] text-center font-bold pb-6">OPEN QUEST</h3>

      <div className="divider m-0 p-0"></div>

      <div className="flex gap-10">
        <article className="hidden lg:w-[300px] lg:flex lg:flex-col lg:gap-1 lg:flex-shrink-0">
          <ImageContainer match={match} title={data?.title} />
          <CountContainer challenger_count={data?.challenger_count} like_count={data?.like_count} />

          <div className="border-2 quest-custom-border p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center font-bold">
            <Clock />
            도전기간 {data?.challenge_period}일
          </div>
        </article>

        <div className="flex flex-col gap-6 w-full">
          <article className="flex flex-col gap-2">
            <Tag tag={data?.tags} />

            <Title title={data?.title} />

            <CreatorInfo name={data?.creator_character_name} server={data?.creator_server_name} />
          </article>

          <Mission mission={data?.mission} />
          <Rank rank={data?.hall_of_fame} />
        </div>
      </div>
    </section>
  );
}

function ImageContainer({ match, title }: { match: RegExpMatchArray | null; title: string }) {
  return (
    <div className="relative aspect-[9/6] overflow-hidden w-full rounded-lg">
      {match && title ? (
        <Image
          src={`https://openquest-image.nexon.com/${match[1]}`}
          fill
          sizes="100%"
          className={`transition-transform duration-300 ease-in-out group-hover:scale-110`}
          style={{ objectFit: "cover" }}
          alt={title}
          unoptimized
        />
      ) : (
        <div className="skeleton rounded-lg aspect-[9/6]"></div>
      )}
    </div>
  );
}

function CountContainer({ challenger_count, like_count }: { challenger_count: number; like_count: number }) {
  return (
    <div className="relative grid grid-cols-[1fr_1px_1fr]">
      <div className="p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center">
        <User />
        <span className={`${!challenger_count && "skeleton h-5 w-16"}`}>{challenger_count?.toLocaleString()}</span>
      </div>
      <div className="divider divider-horizontal p-0 m-0 after:bg-neutral-content before:bg-neutral-content py-3"></div>
      <div className="p-3 flex gap-2 justify-center text-[12px] md:text-[14px] items-center">
        <Heart />
        <span className={`${!like_count && "skeleton h-5 w-16"}`}>{like_count?.toLocaleString()}</span>
      </div>
    </div>
  );
}
