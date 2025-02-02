import create from "zustand";

interface StoreTypes {
  userData: UserDataTypes | null;

  setUserData: (userData: UserDataTypes) => void;
  deleteUserData: () => void;
}

const useUserDataStore = create<StoreTypes>(set => ({
  userData: null,

  setUserData: userData => {
    set({ userData: userData });
  },

  deleteUserData: () => {
    set({ userData: null });
  },
}));

export default useUserDataStore;
