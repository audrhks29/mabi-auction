import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function loginSubmit(
  data: UserLoginTypes,
  setUserData: (userData: UserDataTypes) => void,
  route: AppRouterInstance,
) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: data.user_id,
        user_password: data.user_password,
      }),
    });

    const resData = await res.json();

    if (resData.error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    } else {
      setUserData(resData.userData);
      route.push("/");
    }
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
}
