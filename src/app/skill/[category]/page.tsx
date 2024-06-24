import CurrentCategoryInfo from "@/components/skill/category/categoryInfo/CurrentCategoryInfo";
import SkillTable from "@/components/skill/category/SkillTable";

export default function SkillPage({ params }: { params: { category: string } }) {
  return (
    <section className="grid gap-3">
      <CurrentCategoryInfo />
      <SkillTable params={params} />
    </section>
  );
}
