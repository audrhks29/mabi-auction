import BigHornOfShoutIndex from "@/components/bigHornOfShout/Index";

export async function generateMetadata(props: { params: Promise<{ server: string }> }) {
  const params = await props.params;
  const serverMap: Record<string, string> = {
    lute: "류트",
    mandolin: "만돌린",
    harp: "하프",
    wolf: "울프",
  };

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
