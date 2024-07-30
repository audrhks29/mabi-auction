import create from "zustand";

interface StoreTypes {
  userData: UserDataTypes | null;
  setUserData: (userData: UserDataTypes) => void;
}

const useUserDataStore = create<StoreTypes>((set, getState) => ({
  userData: null,

  setUserData: userData => {
    set({ userData: userData });
    console.log(getState().userData);
  },
}));

export default useUserDataStore;
