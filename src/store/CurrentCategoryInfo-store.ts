import create from "zustand";

interface storeType {
  myStats: SkillByTotalTypes;

  total_ap_array: {
    id: number;
    ap: number;
  }[];

  total_stats_array: {
    id: number;
    hp?: number;
    mp?: number;
    sp?: number;
    str?: number;
    dex?: number;
    int?: number;
    will?: number;
    luck?: number;
  }[];

  setApTable(skill: SkillsTypes, newRankByAP: number): void;
  setStatsTable(skill: SkillsTypes, newRankByStats: StatsTypes): void;

  total_ap: number;
  selectedRp?: RpTypes[];
  myCurrentRp: RpTypes[];

  calculateCurrentStats(newRankStats: SkillByTotalTypes): void;
  calculateCurrentRp(cumulativeRp: RpTypes[]): void;

  initialMyStats(): void;
  initialRp(): void;
}

const useCurrentCategoryInfoStore = create<storeType>((set, getState) => ({
  myStats: {
    ap: 0,
    hp: 0,
    mp: 0,
    sp: 0,
    str: 0,
    dex: 0,
    int: 0,
    will: 0,
    luck: 0,
  },

  selectedRp: [],
  myCurrentRp: [],

  total_ap_array: [],
  total_stats_array: [],

  total_ap: 0,

  setApTable: (skill, newRankByAP) => {
    const state = getState();
    const total_ap_array = state.total_ap_array;

    const newSumAp = {
      id: skill.skill_id,
      ap: newRankByAP,
    };

    if (total_ap_array.some(arr => arr.id === skill.skill_id)) {
      const isTotalApArray = total_ap_array.find(a => a.id === skill.skill_id);
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

    console.log(total_stats_array);
  },

  calculateCurrentStats: (newRankStats: SkillByTotalTypes) => {
    const state = getState();
    const myStats = state.myStats;

    const updateMyStats = (newRankStats: SkillByTotalTypes) => {
      const updatedStats = myStats;

      Object.keys(myStats).forEach(key => {
        const statKey = key as keyof SkillByTotalTypes;
        updatedStats[statKey] += newRankStats[statKey as keyof SkillByTotalTypes] as number;
      });

      return updatedStats;
    };

    updateMyStats(newRankStats);
    set({ myStats: myStats });
  },

  initialMyStats: () => {
    set({ myStats: { ap: 0, hp: 0, mp: 0, sp: 0, str: 0, dex: 0, int: 0, will: 0, luck: 0 } });
  },

  calculateCurrentRp: (cumulativeRp: RpTypes[]) => {
    const state = getState();
    const selectedRp = state.selectedRp || [];
    const myCurrentRp = state.myCurrentRp || [];

    cumulativeRp.forEach(key => {
      const isKey = selectedRp?.find(item => item.skill_id === key.skill_id && item.title === key.title);

      if (isKey) {
        isKey.exp = key.exp;
      } else {
        selectedRp?.push(key);
      }
    });

    set({ selectedRp: selectedRp });

    const calculateRp = selectedRp.reduce<Record<string, number>>((acc, curr) => {
      if (!acc[curr.title]) {
        acc[curr.title] = 0;
      }
      acc[curr.title] += curr.exp;
      return acc;
    }, {});

    const myCurrentValue = Object.entries(calculateRp).map(([title, exp]) => ({
      title,
      exp: exp as number,
    }));

    set({ myCurrentRp: myCurrentValue });
    // console.log(myCurrentRp);
  },

  initialRp: () => {
    set({ selectedRp: [], myCurrentRp: [] });
  },
}));

export default useCurrentCategoryInfoStore;
