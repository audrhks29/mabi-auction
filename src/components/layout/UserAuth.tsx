"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useUserData } from "@/hooks/auth/useUserData";
import { useLogout } from "@/hooks/auth/useSubmitLogout";

import { Button } from "@/components/ui/button";

export default function UserAuth({ cn }: { cn?: string }) {
  const { data: userData } = useUserData();

  return (
    <React.Fragment>
      {!userData ? <LoginButton cn={cn} /> : <LogoutButton userData={userData} cn={cn} />}
    </React.Fragment>
  );
}

function LoginButton({ cn }: { cn?: string }) {
  return (
    <Link href={"/login"} className={cn}>
      <Button type="button">로그인</Button>
    </Link>
  );
}

function LogoutButton({ userData, cn }: { userData: any; cn?: string }) {
  const { handleSubmit } = useForm();
  const logoutMutation = useLogout();

  const onSubmit = async () => {
    await logoutMutation.mutateAsync();
    alert("로그아웃이 완료되었습니다.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${cn} font-bold w-[220px] text-[14px] flex justify-around items-center`}>
      <div>
        <span className="mr-1">[{userData?.user_server}]</span>
        <span>{userData?.user_nickname}</span>
      </div>

      <Button type="submit" className="m-1">
        {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
      </Button>
    </form>
  );
}
