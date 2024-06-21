import create from "zustand";

interface storeType {
  myStats: SkillByTotalTypes;
  calculateCurrentStats(newRankStats: SkillByTotalTypes): void;
  initialMyStats(): void;
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

  calculateCurrentStats: (newRankStats: SkillByTotalTypes) => {
    const state = getState();
    let myStats = state.myStats;

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
}));

export default useCurrentCategoryInfoStore;
