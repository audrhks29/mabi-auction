import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import talentGradeDetailList from "@/assets/grade/talentGradeDetail.json";

export default function TalentsGradeDetail({
  selectedTalent,
  setSelectedTalent,
}: {
  selectedTalent: string;
  setSelectedTalent: Dispatch<SetStateAction<string>>;
}) {
  const currentTalent = talentGradeDetailList.find(item => item.talent === selectedTalent);
  const { description, skills, link, bonus_stats } = currentTalent;

  const currentGrade = bonus_stats[0].grade;
  const nextGrade = bonus_stats[1].grade;

  const currentGradeStats = bonus_stats[0].stats;
  const nextGradeStats = bonus_stats[1].stats;

  return (
    <ScrollArea className="h-[600px] p-3 text-[14px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-[18px]">
            [{currentGrade}] {selectedTalent}
          </CardTitle>
        </CardHeader>
        <CardContent>{description}</CardContent>

        <CardHeader>
          <CardTitle className="text-[18px]">재능 보너스</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {Object.entries(currentGradeStats).map(([key, value]) => (
            <span key={key}>
              {key} +{value}
            </span>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[18px]">다음 단계 재능 보너스</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col text-[12px]">
          <span>* 다음 단계 재능 : {nextGrade}</span>
          <span>* 재능 단계 승급 시 아래의 효과가 적용됩니다.</span>
        </CardContent>

        <CardContent className="flex flex-col">
          {Object.entries(nextGradeStats).map(([key, value]) => (
            <span key={key}>
              {key} +{value}
            </span>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[18px]">관련 스킬</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          {skills?.map(item => (
            <Link key={item.name_kor} href={`/skill/talent/${link}/${item.skill_id}`}>
              <Image src={item.icon} width={30} height={30} alt={item.name_kor} />
            </Link>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
