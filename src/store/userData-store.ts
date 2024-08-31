import create from "zustand";

interface StoreTypes {
  userData: UserDataTypes | null;
  setUserData: (userData: UserDataTypes) => void;
  deleteUserData: () => void;
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
    set(state => {
      return {
        userData: {
          ...state.userData,
          skill_data: [],
        },
      };
    });
  },

  setUserSkillData: (skill_id, rank) => {
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

    console.log(userSkillData);
  },
}));

export default useUserDataStore;
