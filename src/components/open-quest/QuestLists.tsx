"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Tag from "./questDetail/container/Tag";
import CreatorInfo from "./questDetail/container/CreatorInfo";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import QuestImage from "./questDetail/container/QuestImage";

export default function QuestLists({ data }: { data: QuestTypes[] }) {
  const route = useRouter();

  if (!data) return <SkeletonContainer />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {data?.map(quest => {
        const match = quest.image_url.match(/openquest\/([^/]+)$/);

        return (
          <Card
            key={quest.quest_id}
            className="group w-[240px] mx-auto gap-2 p-0 cursor-pointer border hover:bg-accent"
            onClick={() => route.push(`/open-quest/${quest.quest_id}`)}>
            <CardContent className="p-0">
              <QuestImage match={match} title={quest.title} cn="rounded-t-xl" />

              <div className="p-2 flex flex-col gap-2">
                <p className="group-hover:underline font-bold">{quest.title}</p>
                <CreatorInfo name={quest.creator_character_name} server={quest.creator_server_name} />

                <Tag tag={quest.tags} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function SkeletonContainer() {
  const listArray = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {listArray.map((_, index) => (
        <Card key={index} className="p-0 w-[240px] mx-auto gap-2 border rounded-xl">
          <CardContent className="p-0">
            <Skeleton className="w-full aspect-[9/6]"></Skeleton>

            <div className="p-2 flex flex-col gap-2">
              <Skeleton className="w-[120px] h-[21px]"></Skeleton>
              <Skeleton className="w-[90px] h-[18px]"></Skeleton>
              <Skeleton className="w-[60px] h-[20px]"></Skeleton>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
