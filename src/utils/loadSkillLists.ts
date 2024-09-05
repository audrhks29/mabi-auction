import skillLists from "@/assets/skill/human/skill.json";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const loadSkillLists = (params: Params) => {
  return skillLists.filter(skillList =>
    params.type === "category" ? skillList.category === params.tab : skillList.talent.includes(params.tab as string),
  );
};
