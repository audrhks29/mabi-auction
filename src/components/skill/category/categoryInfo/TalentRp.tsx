import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import skillLists from "@/assets/skill/human/skill.json";
import { useParams } from "next/navigation";

export default function TalentRp() {
  const params = useParams();

  const skills = skillLists.filter(
    skillList =>
      (Array.isArray(params.category)
        ? params.category.includes(skillList.category)
        : skillList.category === params.category) ||
      (Array.isArray(params.category)
        ? params.category.some(cat => skillList.talent.includes(cat))
        : skillList.talent.includes(params.category)),
  );

  // console.log(skills);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px]">관련 재능 등급</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-2">
          나의 재능
          {/* {myCurrentRp?.map((item, index) => {
            // 경험치에 맞는 재능등급 필터
            const rpGradeArray = gradeLists.filter(grade => item.exp >= grade.need_exp);

            // 현재 내 재능등급
            const currentRpGrade = rpGradeArray[rpGradeArray.length - 1] || gradeLists[0];

            const nextRpGrade = gradeLists[rpGradeArray.length];

            const graphWidth = (item.exp / (nextRpGrade?.need_exp || 0 - currentRpGrade?.need_exp)) * 100;
            return (
              <li key={index} className="flex gap-3 justify-between">
                <div className="flex gap-1">
                  <span>{currentRpGrade?.grade}</span>
                  <span>{item.title}</span>
                </div>

                <div className="w-[450px] border">
                  <div
                    style={{
                      width: `${graphWidth}%`,
                    }}
                    className="bg-foreground h-5"></div>

                  <div className="flex justify-between text-[12px]">
                    <span>{currentRpGrade?.need_exp.toLocaleString() || 0}</span>
                    <span>{nextRpGrade?.need_exp.toLocaleString()}</span>
                  </div>
                </div>
              </li>
            );
          })} */}
        </ul>
      </CardContent>
    </Card>
  );
}
