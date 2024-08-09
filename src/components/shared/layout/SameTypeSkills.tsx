"use client";

import skillLists from "@/assets/skill/human/skill.json";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SameTypeSkills() {
  const [isMoreSkill, setIsMoreSkill] = useState(false);
  const params = useParams();
  const router = useRouter();

  const sameTalentSkillLists = skillLists.filter(skillList =>
    params.type === "category" ? skillList.category === params.tab : skillList.talent.includes(params.tab as string),
  );

  return (
    <div className="mb-3 text-center" style={{ display: !params.id ? "none" : "block" }}>
      <div className="border">
        <h2 className="p-1 font-bold border-b bg-muted">{sameTalentSkillLists[0]?.category_kor} 스킬 목록</h2>

        <span className="p-1 text-[14px] cursor-pointer" onClick={() => setIsMoreSkill(!isMoreSkill)}>
          {isMoreSkill ? "닫기" : "보기"}
        </span>
      </div>

      {isMoreSkill && (
        <ul className="grid grid-cols-6 text-center text-[14px] border border-t-0">
          {sameTalentSkillLists.map(skill => (
            <li key={skill.skill_id} className="p-3 grid gap-3">
              <Image src={skill.icon} width={30} height={30} alt={skill.name_kor} className="m-auto" />
              <p
                onClick={() => {
                  router.push(`/skill/${params.category}/${skill.skill_id}`);
                }}
                className="cursor-pointer hover:font-bold">
                {skill.name_kor}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
