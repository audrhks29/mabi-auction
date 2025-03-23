import Index from "@/components/open-quest/questDetail/Index";

export default async function OpenQuestDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <main className="inner">
      <Index params={params} />
    </main>
  );
}
