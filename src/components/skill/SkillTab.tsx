import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import talentLists from "@/assets/skill/talent.json";
import categoryLists from "@/assets/skill/skillCategory.json";
import Link from "next/link";

export function AllSkill() {
  return (
    <li>
      <Link href={"/skill"} className="hover:underline">
        전체
      </Link>
    </li>
  );
}

export default function SkillTab({ params }: { params: { talent: string } | string }) {
  return (
    <Tabs defaultValue="category">
      <TabsList>
        <TabsTrigger value="category">분류별</TabsTrigger>
        <TabsTrigger value="talent">재능별</TabsTrigger>
      </TabsList>

      <TabsContent value="category" className="border p-3 rounded-sm">
        <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
          <AllSkill />
          {categoryLists.map(talent => (
            <li key={talent.id}>
              <Link href={""} className="hover:underline">
                {talent.category}
              </Link>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="talent" className="border p-3 rounded-sm">
        <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
          <AllSkill />
          {talentLists.map(talent => (
            <li key={talent.id}>
              <Link href={talent.link ? `/skill/${talent.link}` : ""} className="hover:underline">
                {talent.talent}
              </Link>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
