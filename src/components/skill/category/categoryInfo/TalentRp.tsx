import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import gradeLists from "@/assets/grade/grade.json";

export default function TalentRp() {
  const { myCurrentRp } = useCurrentCategoryInfoStore();
  console.log(myCurrentRp);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[20px]">관련 재능 등급</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-2">
          {myCurrentRp?.map((item, index) => {
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
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
