import create from "zustand";

interface StoreTypes {
  submitInputText: string | null;
  submitSearchOption: string;

  category: ItemCategoryStateTypes;
  activeCategory: number | null;
  openCategoryIds: number[];

  setSubmitInputText: (value: string | null) => void;
  setSubmitSearchOption: (value: string) => void;
  setCategory: (majorCategory: string | null, subCategory: string | null) => void;
  setActiveCategory: (detail_category_id: number) => void;
  setOpenCategoryIds: (categoryId: number) => void;
  initialAll: () => void;
}

const useItemSearchStore = create<StoreTypes>((set, getState) => ({
  submitInputText: null,
  submitSearchOption: "match",

  category: {
    category: null,
    detailCategory: null,
  },

  activeCategory: null,
  openCategoryIds: [],

  setSubmitInputText: value => {
    set({ submitInputText: value });
  },

  setSubmitSearchOption: value => {
    set({ submitSearchOption: value });
  },

  setCategory: (majorCategory, subCategory) => {
    set({
      category: { category: majorCategory, detailCategory: subCategory },
    });
  },

  setActiveCategory: detail_category_id => {
    set({ activeCategory: detail_category_id });
  },

  setOpenCategoryIds: (categoryId: number) =>
    set(state => ({
      openCategoryIds: state.openCategoryIds.includes(categoryId)
        ? state.openCategoryIds.filter(id => id !== categoryId)
        : [...state.openCategoryIds, categoryId],
    })),

  initialAll: () => {
    set({
      submitInputText: null,
      submitSearchOption: "match",
      category: {
        category: null,
        detailCategory: null,
      },
      activeCategory: null,
      openCategoryIds: [],
    });
  },
}));

export default useItemSearchStore;
