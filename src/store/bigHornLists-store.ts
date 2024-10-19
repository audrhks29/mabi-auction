import create from "zustand";

interface StoreTypes {
  filteredData: hornListTypes[] | [];
  setFilteredData: (data: hornListTypes[] | []) => void;
}

const useBigHornListsStore = create<StoreTypes>((set, getState) => ({
  filteredData: [],

  setFilteredData: data => {
    set({ filteredData: data });
  },
}));

export default useBigHornListsStore;
