import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import categoryLists from "@/assets/skill/skillCategory.json";
import talentLists from "@/assets/skill/talent.json";

interface TalentListsTypes {
  id: number;
  image: {
    bronze: string;
    silver: string;
    gold: string;
    grandmaster: string;
  };
  talent: string;
  link: string;
}

interface CategoryListsTypes {
  id: number;
  category: string;
  link: string;
}

interface Items {
  id: number;
  text: string;
  list: TalentListsTypes[] | CategoryListsTypes[];
  type: string;
}

const itemsArray = [
  { id: 1, text: "분류별 스킬", list: categoryLists, type: "category" },
  { id: 2, text: "재능별 스킬", list: talentLists, type: "talent" },
];

function ItemGroup({ list }: { list: Items }) {
  return (
    <Card key={list.id}>
      <CardHeader>
        <CardTitle className="text-[18px] text-center">{list.text}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-6 text-[14px]">
        <SkillEdge lists={list.list} type={list.type} />
      </CardContent>
    </Card>
  );
}

function SkillEdge({ lists, type }: { lists: TalentListsTypes[] | CategoryListsTypes[]; type: string }) {
  return (
    <ul className="grid grid-cols-3 gap-1">
      {lists.map(item => (
        <li key={item.id} className="text-center">
          <Link href={`/skill/${type}/${item.link}`} className="hover:underline">
            {"category" in item ? item.category : item.talent}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function AllSkillPage() {
  return (
    <section className="grid grid-cols-2 gap-3">
      {itemsArray.map(item => (
        <ItemGroup key={item.id} list={item} />
      ))}
    </section>
  );
}
