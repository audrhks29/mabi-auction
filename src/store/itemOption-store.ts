import create from "zustand";

interface StoreTypes {
  selectedItemOptions: OptionTypes[];
  isFiltered: boolean;
  setSelectedItemOptions: (data: OptionTypes[]) => void;
  addItemOption: () => void;
  removeItemOption: (index: number) => void;
  clearItemOptions: () => void;
  setIsFilter: (value: boolean) => void;
}

const useItemOptionStore = create<StoreTypes>((set, getState) => ({
  selectedItemOptions: [],
  isFiltered: false,

  setSelectedItemOptions: data => {
    set({ selectedItemOptions: data });
  },

  addItemOption: () => {
    const selectedItemOptions = getState().selectedItemOptions;
    if (selectedItemOptions.length < 5) {
      set(state => ({
        selectedItemOptions: [...state.selectedItemOptions, { option_type: "" }],
      }));
    } else {
      alert("5개 이상으로 추가할 수 없습니다.");
    }
  },

  removeItemOption: (index: number) => {
    set(state => ({
      selectedItemOptions: state.selectedItemOptions.filter((_, i) => i !== index),
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
