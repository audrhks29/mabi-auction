import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Dispatch, SetStateAction } from "react";

export const fetchUserSkillData = async (params: Params, setUserSkillData: Dispatch<SetStateAction<string>>) => {
  try {
    const res = await fetch(`/api/auth/userData/skill/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    if (resData.rank) {
      setUserSkillData(resData.rank);
    } else if (resData.error) {
      console.error(resData.error);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
