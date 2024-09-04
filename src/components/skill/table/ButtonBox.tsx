"use client";

import { Button } from "@/components/ui/button";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import useUserDataStore from "@/store/userData-store";
import skillLists from "@/assets/skill/human/skill.json";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ButtonBox() {
  const setCurrentCategorySkill = useCurrentCategoryInfoStore(state => state.setCurrentCategorySkill);
  const userData = useUserDataStore(state => state.userData);
  const resetUserSkillData = useUserDataStore(state => state.resetUserSkillData);
  const initialTable = useCurrentCategoryInfoStore(state => state.initialTable);
  const initialCurrentCategorySkill = useCurrentCategoryInfoStore(state => state.initialCurrentCategorySkill);
  const params = useParams();

  const skill = skillLists.filter(skillList =>
    params.type === "category" ? skillList.category === params.tab : skillList.talent.includes(params.tab),
  );

  useEffect(() => {
    setCurrentCategorySkill(skill, userData?.skill_data);
  }, [params, setCurrentCategorySkill, skill, userData]);

  return (
    <div className="flex flex-col justify-between">
      <div className="h-auto">내 재능</div>

      <div className="ml-auto">
        <Button
          type="button"
          className="mr-2"
          onClick={() => {
            const confirmMessage = confirm("해당 스킬목록을 초기화 하시겠습니까?");
            if (confirmMessage) {
              resetUserSkillData();
              initialTable();
              initialCurrentCategorySkill(skill);
            }
          }}>
          초기화
        </Button>

        <Button type="button">저장</Button>
      </div>
    </div>
  );
}
