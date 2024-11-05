import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import useUserDataStore from "@/store/userData-store";

export default function LogoutPopover() {
  const { userData, deleteUserData } = useUserDataStore();
  const { handleSubmit } = useForm();
  const route = useRouter();

  const onSubmit = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const confirm = window.confirm("로그아웃 하시겠습니까?");

      if (confirm) {
        deleteUserData();
        route.push("/");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-bold w-[220px] text-[14px] flex justify-around items-center">
      <div>
        <span>[{userData?.server}]</span>&nbsp;<span>{userData?.nickname}</span>
      </div>

      <Button variant="outline" type="submit">
        로그아웃
      </Button>
    </form>
  );
}
