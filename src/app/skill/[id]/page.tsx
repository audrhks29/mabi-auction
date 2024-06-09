import skillLists from "@/assets/skill/human.json";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
export default function SkillDetailPage({ params }) {
  // console.log(params);
  const findSkill = skillLists
    .find(item => item.talent === "인형사")
    ?.skills.find(skill => skill.skill_id == params.id);

  return (
    <main className="inner">
      <div>
        <Image src={findSkill?.icon || ""} width={30} height={30} alt={findSkill?.name_kor || ""} />
      </div>

      <div>{findSkill?.description}</div>

      <div>
        <Carousel>
          <CarouselContent>
            {findSkill?.skill_by_rank.map(item => (
              <CarouselItem key={item.rank} className="basis-1/3">
                <div className="border text-center text-[14px] p-3">
                  <h2 className="font-bold text-[16px] py-3">
                    랭크 {item.rank} {findSkill.name_kor}
                  </h2>

                  <Image
                    className="m-auto"
                    src={findSkill?.icon || ""}
                    width={50}
                    height={50}
                    alt={findSkill?.name_kor || ""}
                  />

                  <div className="border my-3 py-3 rounded-sm">
                    {item.effect.map((effect, index) => (
                      <p key={index}>{effect}</p>
                    ))}
                  </div>

                  <div className="border text-left text-[12px] p-3 rounded-sm">
                    <h2 className="font-bold text-[14px] pb-3">수련방법</h2>
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
