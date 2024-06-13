import Image from "next/image";

import skillLists from "@/assets/skill/human.json";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CurrentRank from "@/components/skill/talent/CurrentRank";
import Training from "@/components/skill/talent/skillCard/Training";
import AbilityPoint from "@/components/skill/talent/skillCard/AbilityPoint";
import Stats from "@/components/skill/talent/skillCard/Stats";
import DetailDescription from "@/components/skill/talent/skillCard/DetailDescription";
import { convertCumulativeStatsArray } from "@/utils/cumulativeBonusStats";

export default function SkillDetailPage({
  params,
}: {
  params: {
    talent: string;
    id: number;
  };
}) {
  const findSkill = skillLists.find(item => item.talent === params.talent && item.skill_id == params.id);

  return (
    <section className="grid gap-3">
      <CurrentRank totalStats={findSkill?.skill_by_total} rank={findSkill?.skill_by_rank} />

      <Tabs defaultValue="F" className="grid gap-3">
        <TabsList className="block w-fit m-auto">
          {findSkill?.skill_by_rank.map(item => (
            <TabsTrigger className="w-12" key={item.rank} value={item.rank}>
              {item.rank}
            </TabsTrigger>
          ))}
        </TabsList>

        {findSkill?.skill_by_rank.map((rank, index) => {
          const cumulativeAP = findSkill.skill_by_rank.slice(0, index + 1).reduce((acc, rankInfo) => {
            return acc + rankInfo.ap;
          }, 0);
          // ----------------------------------------------------------------

          // 누적 스탯 계산
          const flatCumulativeStatsArray = convertCumulativeStatsArray(findSkill, index);
          // ----------------------------------------------------------------
          const nextRank = findSkill && findSkill?.skill_by_rank[index + 1];
          // 승급 시 받는 스탯 계산
          const bonusStats = nextRank?.bonus_stat;
          const entriesBonusStats = bonusStats && Object.entries(bonusStats);
          const flatBonusStats = entriesBonusStats && entriesBonusStats.flatMap(([key, value]) => [key, value]);

          return (
            <TabsContent className="w-[450px] m-auto" key={rank.rank} value={rank.rank}>
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

                  <div className="border py-3 rounded-sm">
                    {rank?.effect.map((effect, index) => <p key={index}>{effect}</p>)}
                  </div>

                  {/* --- 수련방법 --- */}
                  <Training rank={rank} />

                  {/* --- AP --- */}
                  <AbilityPoint nextRank={nextRank} cumulativeAP={cumulativeAP} />

                  {/* --- 스탯 --- */}
                  <Stats flatBonusStats={flatBonusStats} flatCumulativeStatsArray={flatCumulativeStatsArray} />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
