"use client";

import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import talentLists from "@/assets/skill/talent.json";
import categoryLists from "@/assets/skill/skillCategory.json";
import { useParams } from "next/navigation";

export default function SkillTab() {
  const params = useParams();

  return (
    Object.keys(params).length !== 0 && (
      <Tabs defaultValue="category" className="mb-3">
        <TabsList>
          <TabsTrigger value="category">분류별</TabsTrigger>
          <TabsTrigger value="talent">재능별</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="border p-3 rounded-sm">
          <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
            {categoryLists.map(category => {
              return (
                <li key={category.id}>
                  <Link href={category.link ? `/skill/category/${category.link}` : ""} className="hover:underline">
                    {category.category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </TabsContent>

        <TabsContent value="talent" className="border p-3 rounded-sm">
          <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
            {talentLists.map(talent => {
              return (
                <li key={talent.id}>
                  <Link href={talent.link ? `/skill/talent/${talent.link}` : ""} className="hover:underline">
                    {talent.talent}
                  </Link>
                </li>
              );
            })}
          </ul>
        </TabsContent>
      </Tabs>
    )
  );
}
