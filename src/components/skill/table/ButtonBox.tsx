"use client";

import { Button } from "@/components/ui/button";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import useUserDataStore from "@/store/userData-store";

export default function ButtonBox() {
  const resetUserSkillData = useUserDataStore(state => state.resetUserSkillData);
  const initialTable = useCurrentCategoryInfoStore(state => state.initialTable);

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
            }
          }}>
          초기화
        </Button>

        <Button type="button">저장</Button>
      </div>
    </div>
  );
}
