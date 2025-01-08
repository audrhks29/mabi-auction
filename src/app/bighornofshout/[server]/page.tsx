import BigHornOfShoutIndex from "@/components/bigHornOfShout/Index";

export async function generateMetadata({ params }: { params: { server: string } }) {
  const serverMap: Record<string, string> = {
    lute: "류트",
    mandolin: "만돌린",
    harp: "하프",
    wolf: "울프",
  };

  const serverName = serverMap[params.server] || "";
  return { title: `${serverName}서버 뿔피리` };
}
export default function BigHornOfShoutServerPage({ params }: { params: { server: string } }) {
  return (
    <main className="inner">
      <BigHornOfShoutIndex params={params} />
    </main>
  );
}
