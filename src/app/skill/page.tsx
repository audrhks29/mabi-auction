import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import categoryLists from "@/assets/skill/skillCategory.json";
import talentLists from "@/assets/skill/talent.json";

export default function AllSkillPage() {
  return (
    <section className="grid grid-cols-3 gap-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-[18px] text-center">분류별 스킬</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 text-[14px]">
          <ul className="grid grid-cols-2 gap-1">
            {categoryLists.map(item => (
              <li key={item.id} className="text-center">
                <Link href={`/skill/${item.link}`} className="hover:underline">
                  {item.category}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[18px] text-center">재능별 스킬</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 text-[14px]">
          <ul className="grid grid-cols-2 gap-1">
            {talentLists.map(item => (
              <li key={item.id} className="text-center">
                <Link href={item.link ? `/skill/${item.link}` : ""} className="hover:underline">
                  {item.talent}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
