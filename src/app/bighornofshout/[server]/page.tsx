import BigHornOfShoutIndex from "@/components/bigHornOfShout/Index";

import { serverMap } from "@/utils/serverMap";

export async function generateMetadata(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  const serverName = serverMap[params.server] || "";
  return {
    title: `${serverName}서버 뿔피리`,
    description: "마비옥션에서 뿔피리 내역을 검색해보세요",
    keywords: [
      "마비노기 류트서버 뿔피리",
      "마비노기 하프서버 뿔피리",
      "마비노기 만돌린서버 뿔피리",
      "마비노기 울프서버 뿔피리",
    ],
  };
}

export default async function BigHornOfShoutServerPage(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;
  return (
    <main className="inner">
      <BigHornOfShoutIndex params={params} />
    </main>
  );
}
