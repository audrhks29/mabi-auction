import Image from "next/image";

import skillLists from "@/assets/skill/human.json";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import SameTalentSkills from "@/components/skill/SameTalentSkills";

export default function SkillDetailPage({ params }: { params: { category: string; id: number } }) {
  const findSkill = skillLists.find(item => item.talent === params.category && item.skill_id == params.id);

  return (
    <main className="inner">
      <SameTalentSkills params={params} />

      <div className="grid gap-3 mb-3">
        <h2 className="text-center text-[20px] font-bold">{findSkill?.name_kor}</h2>
        <Image src={findSkill?.icon || ""} width={60} height={60} alt={findSkill?.name_kor || ""} className="m-auto" />
        <p>{findSkill?.description}</p>
      </div>

      <div>
        <Carousel>
          <CarouselContent>
            {findSkill?.skill_by_rank.map((item, skillIndex) => {
              // 누적 ap 계산
              const cumulativeAP = findSkill.skill_by_rank.slice(0, skillIndex + 1).reduce((acc, rankInfo) => {
                return acc + rankInfo.ap;
              }, 0);
              // ----------------------------------------------------------------

              // 누적 스탯 계산
              const cumulativeBonusStats = findSkill.skill_by_rank
                .slice(0, skillIndex + 1)
                .reduce((acc: StatsTypes, rankInfo) => {
                  const bonusStat = rankInfo.bonus_stat;
                  if (bonusStat) {
                    for (const [key, value] of Object.entries(bonusStat)) {
                      if (key in acc) {
                        acc[key as keyof StatsTypes] = (acc[key as keyof StatsTypes] || 0) + (value as number);
                      } else {
                        acc[key as keyof StatsTypes] = value as number;
                      }
                    }
                  }
                  return acc;
                }, {} as StatsTypes);

              const entriesCumulativeStats = Object.entries(cumulativeBonusStats);
              const flatCumulativeStatsArray = entriesCumulativeStats.flatMap(([key, value]) => [key, value]);
              // ----------------------------------------------------------------

              // 승급 시 받는 스탯 계산
              const bonusStats = findSkill?.skill_by_rank[skillIndex + 1]?.bonus_stat;
              const entriesBonusStats = bonusStats && Object.entries(bonusStats);
              const flatBonusStats = entriesBonusStats && entriesBonusStats.flatMap(([key, value]) => [key, value]);
              // ----------------------------------------------------------------
              return (
                <CarouselItem key={item.rank} className="basis-1/3">
                  <div className="border text-center text-[14px] p-3 grid gap-3">
                    <h3 className="font-bold text-[16px]">
                      랭크 {item.rank} {findSkill.name_kor}
                    </h3>

                    <Image
                      className="m-auto"
                      src={findSkill?.icon || ""}
                      width={50}
                      height={50}
                      alt={findSkill?.name_kor || ""}
                    />

                    <div className="border py-3 rounded-sm">
                      {item.effect.map((effect, index) => (
                        <p key={index}>{effect}</p>
                      ))}
                    </div>

                    {/* --- 수련방법 --- */}
                    <div className="border text-left text-[12px] p-3 rounded-sm">
                      <h3 className="font-bold text-[14px] pb-3">수련방법</h3>

                      {item.training_list.map((training, index) => (
                        <div key={index} className="grid grid-cols-[3fr_1fr]">
                          <div className="flex">
                            <p>*&nbsp;</p>
                            <p>{training.title}</p>
                          </div>

                          <div className="flex justify-end">
                            <p>+{training.training_exp}&nbsp;</p>
                            <p>(0/{training.max_count})</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* --- AP --- */}
                    <div className="border text-left text-[12px] p-3 rounded-sm">
                      <h3 className="font-bold text-[14px] pb-3">AP</h3>

                      <div className="grid grid-cols-[3fr_1fr]">
                        <div className="flex">
                          <p>*&nbsp;</p>
                          <p>승급에 필요한 어빌리티 포인트</p>
                        </div>
                        <div className="flex justify-end">
                          <p>{findSkill?.skill_by_rank[skillIndex + 1]?.ap || 0} AP</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-[3fr_1fr]">
                        <div className="flex">
                          <p>*&nbsp;</p>
                          <p>누적 어빌리티 포인트</p>
                        </div>
                        <div className="flex justify-end">
                          <p>{cumulativeAP} AP</p>
                        </div>
                      </div>
                    </div>

                    {/* --- 승급시 받는 스탯 --- */}
                    <div className=" text-left text-[12px] grid grid-cols-2 gap-3">
                      <div className="border p-3 rounded-sm">
                        <h3 className="font-bold text-[14px] pb-3">승급 시 받는 스탯</h3>

                        <div className="grid grid-cols-2">
                          {flatBonusStats &&
                            flatBonusStats.map((item, index) => {
                              if (typeof item === "string") return <p key={index}>* {item}</p>;
                              else if (typeof item === "number") {
                                return (
                                  <p key={index} className="flex justify-end">
                                    +{item}
                                  </p>
                                );
                              }
                            })}
                        </div>
                      </div>

                      {/* --- 누적 스탯 --- */}
                      <div className="border p-3 rounded-sm">
                        <h3 className="font-bold text-[14px] pb-3">누적 스탯</h3>

                        <div className="grid grid-cols-2">
                          {flatCumulativeStatsArray.map((stat, index) => {
                            if (typeof stat === "string") {
                              return <p key={index}>* {stat}</p>;
                            } else if (typeof stat === "number") {
                              return (
                                <p key={index} className="flex justify-end">
                                  + {stat}
                                </p>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
