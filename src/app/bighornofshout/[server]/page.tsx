import BigHornOfShoutIndex from "@/components/bigHornOfShout/Index";

import { serverMap } from "@/utils/serverMap";

export async function generateMetadata(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;

  const serverName = serverMap[params.server] || "";
  return { title: `${serverName}서버 뿔피리` };
}

export default async function BigHornOfShoutServerPage(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;
  return (
    <main className="inner">
      <BigHornOfShoutIndex params={params} />
    </main>
  );
}
