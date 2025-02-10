import create from "zustand";

interface StoreTypes {
  selectedItemOptions: OptionTypes[];
  isFiltered: boolean;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
  addItemOption: () => void;
  clearItemOptions: () => void;
  setIsFilter: (value: boolean) => void;
}

const useItemOptionStore = create<StoreTypes>((set, getState) => ({
  selectedItemOptions: [],
  isFiltered: false,

  setSelectedItemOptions: (index, newOption) => {
    set(state => {
      const updatedOptions = [...state.selectedItemOptions];
      updatedOptions[index] = { ...updatedOptions[index], ...newOption };
      return { selectedItemOptions: updatedOptions };
    });
  },

  addItemOption: () => {
    set(state => ({
      selectedItemOptions: [...state.selectedItemOptions, { option_type: "" }],
    }));
  },

  clearItemOptions: () => {
    set({ selectedItemOptions: [] });
  },

  setIsFilter: value => {
    set({ isFiltered: value });
  },
}));

export default useItemOptionStore;
