import { useForm } from "react-hook-form";

import { useUserData } from "@/hooks/auth/useUserData";
import { useLogout } from "@/hooks/auth/useSubmitLogout";
import { useRouter } from "next/navigation";

export default function LogoutPopover() {
  const { data: userData } = useUserData();
  const { handleSubmit } = useForm();
  const logoutMutation = useLogout();

  const onSubmit = async () => {
    await logoutMutation.mutateAsync();
    alert("로그아웃이 완료되었습니다.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-bold w-[220px] text-[14px] flex justify-around items-center">
      <div>
        <span>[{userData?.user_server}]</span>&nbsp;<span>{userData?.user_nickname}</span>
      </div>

      <button type="submit" className="btn btn-neutral m-1">
        {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
      </button>
    </form>
  );
}
