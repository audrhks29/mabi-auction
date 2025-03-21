import QuestDetailIndex from "@/components/open-quest/questDetail/QuestDetailIndex";

export default async function OpenQuestDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <main className="inner">
      <QuestDetailIndex params={params} />
    </main>
  );
}
