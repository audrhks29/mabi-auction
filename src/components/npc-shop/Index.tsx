"use client";

import React, { useEffect, useState } from "react";

import Options from "./Options";
import TabMenuIndex from "./Tab/TabIndex";

import convertToKoreanTime from "@/utils/convertToKoreanTime";
import { serverMap } from "@/utils/serverMap";

import { useNpcShopLists } from "@/hooks/npc-shop/useNpcShopLists";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function NpcShopIndex({ params }: { params: { server: string } }) {
  const [npcName, setNpcName] = useState("델");
  const [channel, setChannel] = useState("1");
  const [tabNumber, setTabNumber] = useState(0);

  useEffect(() => {
    setTabNumber(0);
  }, [npcName, channel]);

  const { data } = useNpcShopLists(params, npcName, channel);

  return (
    <section>
      <h3 className="text-[18px] font-bold pb-6">{serverMap[params.server]}서버 NPC 상점</h3>

      <div className="grid gap-3 w-full">
        <Options setNpcName={setNpcName} setChannel={setChannel} />

        <div className="text-card-foreground/60">
          <UpdateTime data={data} title="기준" />
          <UpdateTime data={data} title="갱신" />
        </div>

        <Separator />

        <TabMenuIndex
          params={params}
          npcName={npcName}
          channel={channel}
          tabNumber={tabNumber}
          setTabNumber={setTabNumber}
        />
      </div>
    </section>
  );
}

function UpdateTime({ data, title }: { data: NpcTypes; title: string }) {
  return (
    <div className="flex gap-2 justify-end">
      <span className="text-[12px]">{title}</span>
      {data && !data.error ? (
        <span className="text-[12px]">
          {convertToKoreanTime(data.date_inquire).formattedDate}&nbsp;
          {convertToKoreanTime(data.date_inquire).formattedTime}
        </span>
      ) : (
        <Skeleton className="h-4 w-40"></Skeleton>
      )}
    </div>
  );
}
