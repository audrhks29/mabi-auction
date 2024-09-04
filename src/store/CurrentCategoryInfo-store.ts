import { create } from "zustand";

interface StoreType {
  total_ap_array: {
    id: number;
    ap: number;
  }[];
  total_stats_array: StatsIncludeIdTypes[];
  total_rp_array: any[];

  total_ap: number;
  total_stats: StatsIncludeIdTypes;
  total_rp: RpTypes[];

  current_category_skill_array: { skill_id: number; rank: string }[];

  setCurrentCategorySkill(skill: SkillsTypes[], userSkillData: { skill_id: number; rank: string }[] | undefined): void;
  setSelectedSkillRank(skill_id: number, rank: string): void;
  initialCurrentCategorySkill(skill: SkillsTypes[]): void;

  setApTable(skill: SkillsTypes, newRankByAP: number): void;
  setStatsTable(skill: SkillsTypes, newRankByStats: StatsTypes): void;
  setRpTable(skill: number, newRp: RpTypes[] | null): void;
  initialTable(): void;
}

const useCurrentCategoryInfoStore = create<StoreType>((set, getState) => ({
  total_ap_array: [],
  total_stats_array: [],
  total_rp_array: [],

  total_ap: 0,
  total_stats: {},
  total_rp: [],

  current_category_skill_array: [],

  setCurrentCategorySkill: (skill, userSkillData) => {
    const newSkill = skill.map(skillList => {
      return {
        skill_id: skillList.skill_id,
        rank: userSkillData?.find(item => item.skill_id === skillList.skill_id)?.rank || "연습",
      };
    });

    set({ current_category_skill_array: newSkill });
  },

  setSelectedSkillRank: (skill_id, rank) => {
    const currentSkills = getState().current_category_skill_array;
    const updatedSkills = currentSkills.map(skill => (skill.skill_id === skill_id ? { ...skill, rank } : skill));

    set({ current_category_skill_array: updatedSkills });
  },

  initialCurrentCategorySkill: skill => {
    const newSkill = skill.map(skillList => {
      return {
        skill_id: skillList.skill_id,
        rank: "연습",
      };
    });

    set({ current_category_skill_array: newSkill });
  },
  // ap 데이터
  setApTable: (skill, newRankByAP) => {
    const total_ap_array = getState().total_ap_array;

    const newSumAp = {
      id: skill.skill_id,
      ap: newRankByAP,
    };

    if (total_ap_array.some(arr => arr.id === skill.skill_id)) {
      const isTotalApArray = total_ap_array.find(arr => arr.id === skill.skill_id);
      if (isTotalApArray) isTotalApArray.ap = newRankByAP;
    } else {
      total_ap_array.push(newSumAp);
    }

    const newTotalAp = total_ap_array.reduce((acc, cur) => {
      return acc + cur.ap;
    }, 0);

    set({ total_ap: newTotalAp });
  },

  // stats 데이터
  setStatsTable: (skill, newRankByStats) => {
    const total_stats_array = getState().total_stats_array;

    const newSumStats = {
      id: skill.skill_id,
      ...newRankByStats,
    };

    const selectedIndex = total_stats_array.findIndex(arr => arr.id === skill.skill_id);
    if (selectedIndex !== -1) {
      total_stats_array[selectedIndex] = newSumStats;
    } else {
      total_stats_array.push(newSumStats);
    }

    const newTotalStats = total_stats_array.reduce(
      (acc, current) => {
        for (const key in current) {
          if (key !== "id" && typeof current[key as keyof Omit<StatsTypes, "id">] === "number") {
            acc[key as keyof Omit<StatsTypes, "id">] =
              (acc[key as keyof Omit<StatsTypes, "id">] || 0) + current[key as keyof StatsTypes]!;
          }
        }
        return acc;
      },
      {} as Omit<StatsTypes, "id">,
    );

    set({ total_stats: newTotalStats });
  },

  // rp 데이터
  setRpTable: (skill_id, newRp) => {
    const state = getState();
    const total_rp_array = state.total_rp_array;
    if (newRp)
      for (const index in newRp) {
        const findSkillRp = total_rp_array.findIndex(r => r.id === skill_id && r.title === newRp[index].title);

        const SkillRp = {
          id: skill_id,
          ...newRp[index],
        };

        if (findSkillRp === -1) {
          total_rp_array.push(SkillRp);
        } else {
          total_rp_array[findSkillRp] = SkillRp;
        }
      }

    const expSums: { [key: string]: number } = {};

    total_rp_array.forEach(entry => {
      const { title, exp } = entry;
      if (expSums[title]) {
        expSums[title] += exp;
      } else {
        expSums[title] = exp;
      }
    });

    const result = Object.keys(expSums).map(title => {
      return { title: title, exp: expSums[title] };
    });

    set({ total_rp: result });
    // set()
  },
  // Table 초기화
  initialTable: () => {
    set({
      total_ap_array: [],
      total_stats_array: [],
      total_rp_array: [],

      total_ap: 0,
      total_stats: {},
      total_rp: [],
    });
  },
}));

export default useCurrentCategoryInfoStore;
