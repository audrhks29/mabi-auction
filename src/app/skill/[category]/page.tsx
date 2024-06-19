import SkillTab from "@/components/skill/SkillTab";
import SkillTable from "@/components/skill/SkillTable";

export default function SkillPage({ params }: { params: { category: string } }) {
  return (
    <main className="inner">
      <SkillTab params={params} />
      <SkillTable params={params} />
    </main>
  );
}
