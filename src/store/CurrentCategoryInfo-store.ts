import create from "zustand";

interface StoreType {
  total_ap_array: {
    id: number;
    ap: number;
  }[];
  total_stats_array: StatsIncludeIdTypes[];

  total_ap: number;
  total_stats: StatsIncludeIdTypes;

  setApTable(skill: SkillsTypes, newRankByAP: number): void;
  setStatsTable(skill: SkillsTypes, newRankByStats: StatsTypes): void;
}

const useCurrentCategoryInfoStore = create<StoreType>((set, getState) => ({
  total_ap_array: [],
  total_stats_array: [],

  total_ap: 0,
  total_stats: {},

  setApTable: (skill, newRankByAP) => {
    const state = getState();
    const total_ap_array = state.total_ap_array;

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

  setStatsTable: (skill, newRankByStats) => {
    const state = getState();
    const total_stats_array = state.total_stats_array;

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
}));

export default useCurrentCategoryInfoStore;
