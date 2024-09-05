"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { shallow } from "zustand/shallow";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import useUserDataStore from "@/store/userData-store";

import { Button } from "@/components/ui/button";

import { loadSkillLists } from "@/utils/loadSkillLists";

export default function ButtonBox() {
  const params = useParams();

  const { setCurrentCategorySkill, initialTable, initialCurrentCategorySkill } = useCurrentCategoryInfoStore(
    state => ({
      setCurrentCategorySkill: state.setCurrentCategorySkill,
      initialTable: state.initialTable,
      initialCurrentCategorySkill: state.initialCurrentCategorySkill,
    }),
    shallow,
  );

  const { userData, resetUserSkillData } = useUserDataStore(
    state => ({
      userData: state.userData,
      resetUserSkillData: state.resetUserSkillData,
    }),
    shallow,
  );

  const skill = loadSkillLists(params);

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
