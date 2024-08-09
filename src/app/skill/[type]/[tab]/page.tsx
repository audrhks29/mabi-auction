import SkillTable from "@/components/shared/table/SkillTable";
import StatsTable from "@/components/shared/table/StatsTable";

export default function SortByTalentsPage({ params }: { params: { type: string; tab: string } }) {
  return (
    <section className="grid gap-3">
      <article className="grid grid-cols-2 gap-3">
        <StatsTable />
      </article>

      <SkillTable params={params} />
    </section>
  );
}
