"use client";

import skillLists from "@/assets/skill/human.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SameTalentSkills({ params }: { params: { talent: string; id: number } }) {
  const [isMoreSkill, setIsMoreSkill] = useState(false);

  const router = useRouter();

  const SameTalentSkillLists = skillLists.filter(item => item.talent === params.talent);

  const handleClickSkillName = (id: number) => {
    router.push(`/skill/${params.talent}/${id}`);
  };

  return (
    <div className="mb-3 text-center">
      <div className="border">
        <h2 className="p-1 font-bold border-b bg-muted">{SameTalentSkillLists[0].category} 스킬 목록</h2>

        <span className="p-1 text-[14px] cursor-pointer" onClick={() => setIsMoreSkill(!isMoreSkill)}>
          {isMoreSkill ? "닫기" : "보기"}
        </span>
      </div>

      {isMoreSkill && (
        <ul className="grid grid-cols-6 text-center text-[14px] border border-t-0">
          {SameTalentSkillLists.map(skill => (
            <li key={skill.skill_id} className="p-3 grid gap-3">
              <Image src={skill.icon} width={30} height={30} alt={skill.name_kor} className="m-auto" />
              <p onClick={() => handleClickSkillName(skill.skill_id)} className="cursor-pointer hover:font-bold">
                {skill.name_kor}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
