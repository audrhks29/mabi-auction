import NpcShopIndex from "@/components/npc-shop/Index";

import { serverMap } from "@/utils/serverMap";

export async function generateMetadata(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  const serverName = serverMap[params.server] || "";
  return {
    title: `${serverName}서버 NPC 상점`,
    description: "마비옥션에서 NPC 상점을 검색해보세요",
    keywords: ["마비노기 주머니 색상", "마비노기 아이템 색상", "마비노기 npc 상점", "마비노기 npc"],
  };
}

export default async function NpcShopPage(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  return (
    <main className="inner">
      <NpcShopIndex params={params} />
    </main>
  );
}
