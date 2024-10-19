import create from "zustand";

interface StoreTypes {}

const useBigHornListsStore = create<StoreTypes>((set, getState) => ({
  filteredData: [],

  setFilteredData: data => {
    set({ filteredData: data });
  },
}));

export default useBigHornListsStore;
