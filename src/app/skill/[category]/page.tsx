import SkillTable from "@/components/skill/category/SkillTable";

export default function SkillPage({ params }: { params: { category: string } }) {
  return <SkillTable params={params} />;
}
