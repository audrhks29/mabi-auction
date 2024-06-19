"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import talentLists from "@/assets/skill/talent.json";
import categoryLists from "@/assets/skill/skillCategory.json";

function AllSkill({ setTabValue }: { setTabValue: Dispatch<SetStateAction<string>> }) {
  return (
    <li>
      <Link href={"/skill"} className="hover:underline" onClick={() => setTabValue("전체")}>
        전체
      </Link>
    </li>
  );
}

export default function SkillTab() {
  const [tabValue, setTabValue] = useState("전체");
  const params = useParams();

  return (
    !(params.category && params.id) && (
      <>
        <Tabs defaultValue="category" className="mb-3">
          <TabsList>
            <TabsTrigger value="category">분류별</TabsTrigger>
            <TabsTrigger value="talent">재능별</TabsTrigger>
          </TabsList>

          <TabsContent value="category" className="border p-3 rounded-sm">
            <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
              <AllSkill setTabValue={setTabValue} />

              {categoryLists.map(category => {
                const displayText = category.category;

                return (
                  <li key={category.id}>
                    <Link
                      href={category.link ? `/skill/${category.link}` : ""}
                      className="hover:underline"
                      onClick={() => setTabValue(`${displayText} 탭`)}>
                      {category.category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </TabsContent>

          <TabsContent value="talent" className="border p-3 rounded-sm">
            <ul className="grid grid-cols-11 gap-2 text-center text-[14px]">
              <AllSkill setTabValue={setTabValue} />

              {talentLists.map(talent => {
                const displayText = talent.talent;

                return (
                  <li key={talent.id}>
                    <Link
                      href={talent.link ? `/skill/${talent.link}` : ""}
                      className="hover:underline"
                      onClick={() => setTabValue(`${displayText} 재능`)}>
                      {talent.talent}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </TabsContent>
        </Tabs>

        <h2 className="font-bold">{tabValue} 스킬</h2>
      </>
    )
  );
}
