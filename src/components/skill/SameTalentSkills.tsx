"use client";

import skillLists from "@/assets/skill/human.json";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SameTalentSkills({ params }) {
  const router = useRouter();

  const SameTalentSkillLists = skillLists.filter(item => item.talent === params.category);

  const handleClickSkillName = (id: number) => {
    router.push(`/skill/${params.category}/${id}`);
  };

  return (
    <ul className="grid grid-cols-6 text-center border text-[14px]">
      {SameTalentSkillLists.map(skill => (
        <li key={skill.skill_id} className="border-r p-3 grid gap-3">
          <Image src={skill.icon} width={30} height={30} alt={skill.name_kor} className="m-auto" />
          <p onClick={() => handleClickSkillName(skill.skill_id)} className="cursor-pointer hover:font-bold">
            {skill.name_kor}
          </p>
        </li>
      ))}
    </ul>
  );
}
