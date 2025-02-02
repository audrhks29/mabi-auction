import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function registerSubmit(
  data: UserDataTypes,
  isDuplicationId: boolean | null,
  route: AppRouterInstance,
) {
  if (isDuplicationId) alert("가입이 불가능한 아이디입니다.");
  else if (isDuplicationId === null) alert("아이디 중복을 확인해주세요.");
  else if (isDuplicationId === false) {
    const confirm = window.confirm(
      `가입정보를 확인해주세요.\n아이디 : ${data.user_id}\n서버 : ${data.user_server}\n종족 : ${data.user_race}\n닉네임 : ${data.user_nickname}`,
    );

    if (confirm) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: data.user_id,
            user_password: data.user_password,
            user_server: data.user_server,
            user_race: data.user_race,
            user_nickname: data.user_nickname,
          }),
        });

        const resData = await res.json();

        if (resData.error) {
          alert("이미 존재하는 아이디 입니다.");
        } else {
          alert("성공적으로 가입되었습니다.");
          route.push("/");
        }
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    }
  }
}
