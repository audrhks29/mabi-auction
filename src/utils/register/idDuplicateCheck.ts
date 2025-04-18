import { Dispatch, SetStateAction } from "react";

export default async function idDuplicateCheck(
  id: string,
  setIsDuplicationId: Dispatch<SetStateAction<boolean | null>>,
) {
  try {
    const res = await fetch("/api/auth/duplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
      }),
    });

    const resData = await res.json();

    if (resData.error) {
      alert(resData.error);
      setIsDuplicationId(true);
    } else if (resData.message) {
      alert(resData.message);
      setIsDuplicationId(false);
    }
  } catch (error) {
    alert("올바른 접근이 아닙니다.");
    console.error("Error fetching user data:", error);
  }
}
