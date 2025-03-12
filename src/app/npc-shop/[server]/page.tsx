import NpcShopIndex from "@/components/npc-shop/Index";

import { serverMap } from "@/utils/serverMap";

export async function generateMetadata(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  const serverName = serverMap[params.server] || "";
  return { title: `${serverName}서버 NPC 상점` };
}

export default async function NpcShopPage(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  return (
    <main className="inner">
      <NpcShopIndex params={params} />
    </main>
  );
}
