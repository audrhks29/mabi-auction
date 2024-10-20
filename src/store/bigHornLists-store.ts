import create from "zustand";

interface StoreTypes {
  filteredData: HornListTypes[] | [];
  setFilteredData: (data: HornListTypes[] | []) => void;
}

const useBigHornListsStore = create<StoreTypes>((set, getState) => ({
  filteredData: [],

  setFilteredData: data => {
    set({ filteredData: data });
  },
}));

export default useBigHornListsStore;
