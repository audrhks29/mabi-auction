import create from "zustand";

interface storeType {
  myStats: SkillByTotalTypes;

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
    set({ selectedRp: [] });
  },
}));

export default useCurrentCategoryInfoStore;
