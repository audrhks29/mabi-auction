import Image from "next/image";

import skillLists from "@/assets/skill/human/skill.json";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CurrentRank from "@/components/skill/detail/CurrentRank";
import Training from "@/components/skill/detail/skillCard/Training";
import AbilityPoint from "@/components/skill/detail/skillCard/AbilityPoint";
import Stats from "@/components/skill/detail/skillCard/Stats";
import DetailDescription from "@/components/skill/detail/skillCard/DetailDescription";

export default function SkillDetailPage({
  params,
}: {
  params: {
    type: string;
    tab: string;
    id: string;
  };
}) {
  const findSkill = skillLists.find(skillList =>
    params.type === "category"
      ? skillList.category === params.tab && skillList.skill_id === Number(params.id)
      : skillList.talent.includes(params.tab) && skillList.skill_id === Number(params.id),
  );

  return (
    <section className="grid gap-3">
      <CurrentRank skill={findSkill} />

      <Tabs defaultValue="F" className="grid gap-3">
        <TabsList className="block w-fit m-auto">
          {findSkill?.skill_by_rank.map(item => (
            <TabsTrigger className="w-12" key={item.rank} value={item.rank}>
              {item.rank}
            </TabsTrigger>
          ))}
        </TabsList>

        {findSkill?.skill_by_rank.map((rank, index) => {
          return (
            <TabsContent className="w-[500px] m-auto" key={rank.rank} value={rank.rank}>
              <Card className="text-center text-[14px]">
                <CardHeader>
                  <CardTitle className="font-bold text-[16px]">
                    랭크 {rank?.rank} {findSkill.name_kor}
                  </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-3">
                  <Image
                    className="m-auto"
                    src={findSkill.icon}
                    width={50}
                    height={50}
                    alt={findSkill.name_kor || ""}
                  />

                  {/* 자세한 설명보기 */}
                  <DetailDescription description={findSkill.description} />

                  <div className="border p-3 rounded-sm">
                    {rank?.effect?.map((effect, index) => <p key={index}>{effect}</p>)}
                  </div>

                  {/* --- 수련방법 --- */}
                  <Training rank={rank} />

                  {/* --- AP --- */}
                  <AbilityPoint
                    needAp={findSkill.skill_by_rank[index].need_ap}
                    accumulateAP={findSkill.skill_by_rank[index].accumulate_ap}
                  />

                  {/* --- 스탯 --- */}
                  <Stats
                    bonusStats={findSkill.skill_by_rank[index].bonus_stats}
                    accumulateStats={findSkill.skill_by_rank[index].accumulate_stats}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
