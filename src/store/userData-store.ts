import create from "zustand";

interface StoreTypes {
  userData: UserDataTypes | null;

  setUserData: (userData: UserDataTypes) => void;
  deleteUserData: () => void;

  setUserSkillData: (skill_id: number, rank: string) => void;
  resetUserSkillData: () => void;
}

const useUserDataStore = create<StoreTypes>((set, getState) => ({
  userData: null,

  setUserData: userData => {
    set({ userData: userData });
  },

  deleteUserData: () => {
    set({ userData: null });
  },

  resetUserSkillData: () => {
    set((state: StoreTypes): Partial<StoreTypes> => {
      return {
        userData: {
          ...state.userData,
          skill_data: null,
        },
      };
    });
  },

  setUserSkillData: (skill_id: number, rank: string) => {
    const userSkillData = getState().userData?.skill_data;

    let changedUserSkill = userSkillData?.find(item => item.skill_id === skill_id);

    if (!changedUserSkill) {
      const newSkill = {
        skill_id,
        rank,
      };

      userSkillData?.push(newSkill);
    } else {
      changedUserSkill?.rank ? rank : "";
    }
  },
}));

export default useUserDataStore;
