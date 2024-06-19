import SkillTable from "@/components/skill/SkillTable";

export default function SkillPage({ params }: { params: { category: string } }) {
  return <SkillTable params={params} />;
}
