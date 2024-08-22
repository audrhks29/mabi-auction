import Image from "next/image";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import skillLists from "@/assets/skill/human/skill.json";
import talentLists from "@/assets/skill/talent.json";
import gradeLists from "@/assets/grade/grade.json";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

export default function TalentRp() {
  const { total_rp } = useCurrentCategoryInfoStore();
  // const params = useParams();

  // const skills = skillLists.filter(
  //   skillList =>
  //     (Array.isArray(params.category)
  //       ? params.category.includes(skillList.category)
  //       : skillList.category === params.category) ||
  //     (Array.isArray(params.category)
  //       ? params.category.some(cat => skillList.talent.includes(cat))
  //       : skillList.talent.includes(params.category)),
  // );

  // console.log(skills);

  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle className="text-[20px]">관련 재능 등급</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-2">
          {total_rp.map((rp, index) => {
            const myGradeArray = gradeLists.filter(grade => rp.exp >= grade.need_exp);
            const currentGrade_text = myGradeArray[myGradeArray.length - 1]?.grade || "견습";
            const currentGrade_order = myGradeArray[myGradeArray.length - 1]?.order || 0;
            const currentTalent = talentLists.find(t => t.talent === total_rp[index].title);

            let imageSrc = null;
            if (currentGrade_order <= 5) {
              imageSrc = currentTalent?.image.bronze;
            } else if (currentGrade_order <= 10) {
              imageSrc = currentTalent?.image.silver;
            } else if (currentGrade_order <= 15) {
              imageSrc = currentTalent?.image.gold;
            } else if (currentGrade_order === 16) {
              imageSrc = currentTalent?.image.grandmaster;
            }

            return (
              <li key={rp.title} className="grid grid-cols-[50px_1fr] items-center gap-3 border h-16 text-[14px] p-3">
                {imageSrc && <Image src={imageSrc} width={33} height={33} alt={rp.title}></Image>}

                <div>
                  <p>
                    {currentGrade_text} {rp.title}
                  </p>
                  <div className="bg-muted w-full h-4"></div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
