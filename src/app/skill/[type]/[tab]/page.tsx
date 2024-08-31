import ButtonBox from "@/components/skill/table/ButtonBox";

import SkillTable from "@/components/skill/table/SkillTable";
import StatsTable from "@/components/skill/table/StatsTable";

export default function SortByTalentsPage({ params }: { params: { type: string; tab: string } }) {
  return (
    <section className="grid gap-3">
      <article className="grid grid-cols-2 gap-3">
        <StatsTable />
        <ButtonBox />
      </article>

      <SkillTable params={params} />
    </section>
  );
}
