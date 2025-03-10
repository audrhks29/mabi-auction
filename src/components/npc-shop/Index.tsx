"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import npcLists from "@/assets/npc/npcLists.json";
import convertToKoreanTime from "@/utils/convertToKoreanTime";
import Image from "next/image";

export default function NpcShopIndex({ params }: { params: { server: string } }) {
  const [npcName, setNpcName] = useState("델");
  const [channel, setChannel] = useState("1");
  const channelLists = Array.from({ length: 15 }, (v, i) => i + 1);

  const serverMap: Record<string, string> = {
    lute: "류트",
    mandolin: "만돌린",
    harp: "하프",
    wolf: "울프",
  };

  function server(params: { server: string }): string {
    const serverName = serverMap[params.server] || ""; // 기본값 처리
    return encodeURI(serverName);
  }

  const encodedServerName = server(params);
  const encodedNpcName = encodeURI(npcName);

  const { data, isFetching } = useQuery({
    queryKey: [encodedServerName + "npcshop", npcName, channel],
    queryFn: async () => {
      if (encodedServerName !== undefined) {
        const response = await fetch(
          `/api/npc?npc_name=${encodedNpcName}&server=${encodedServerName}&channel=${channel}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
    select: data => {
      return data;
    },
  });

  console.log(data);

  return (
    <section className="text-[12px] md:text-[14px]">
      <h3 className="text-[18px] text-center font-bold pb-6">{serverMap[params.server]}서버 NPC 상점</h3>

      <div className="flex gap-1 flex-col justify-center items-center w-full">
        <div className="flex gap-3">
          <div className="flex gap-3 items-center">
            <p className="font-bold">NPC</p>
            <select className="select select-bordered " onChange={e => setNpcName(e.target.value)}>
              {npcLists.map(npc => (
                <option key={npc} value={npc}>
                  {npc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 items-center">
            <p className="font-bold">채널</p>
            <select className="select select-bordered" onChange={e => setChannel(e.target.value)}>
              {channelLists.map(channelNumber => (
                <option key={channelNumber} value={channelNumber}>
                  {channelNumber}
                </option>
              ))}
            </select>
          </div>
        </div>

        {data && !data?.error && (
          <div className="text-[12px] md:text-[14px]">
            <p>
              기준: {convertToKoreanTime(data.date_inquire).formattedDate}&nbsp;
              {convertToKoreanTime(data.date_inquire).formattedTime}
            </p>
            <p>
              갱신: {convertToKoreanTime(data.date_shop_next_update).formattedDate}&nbsp;
              {convertToKoreanTime(data.date_shop_next_update).formattedTime}
            </p>
          </div>
        )}

        <div className="divider m-0"></div>

        {data?.error?.name === "OPENAPI00009" && <div className="mt-3">API 서버에서 데이터를 갱신중입니다.</div>}

        <div className="tabs tabs-lifted w-full">
          {data &&
            data?.shop?.map((shop: NpcShopTypes, index: number) => (
              <React.Fragment key={shop.tab_name}>
                <input
                  type="radio"
                  name="npc_shop_tab"
                  className="tab"
                  aria-label={shop.tab_name}
                  defaultChecked={index === 0}
                />

                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <table className="table text-center table-xs md:table-sm">
                    <thead>
                      <tr>
                        <th>이미지</th>
                        <th>이름</th>
                        <th>수량</th>
                        <th>가격</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shop.item.map((item, idx) => (
                        <tr key={item.item_display_name + idx} className="hover cursor-pointer min-h-[60px]">
                          <td className="flex justify-center items-center">
                            <Image src={item.image_url} width={50} height={50} alt={item.item_display_name} />
                          </td>
                          <td>{item.item_display_name}</td>
                          <td>{item.item_count}</td>
                          <td>
                            {item.price.map((price, index) => (
                              <span key={index}>
                                {price.price_value.toLocaleString()}
                                {price.price_type}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
}
