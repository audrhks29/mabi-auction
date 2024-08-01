"use client";

import { useForm } from "react-hook-form";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

import Link from "next/link";
import useUserDataStore from "@/store/userData-store";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface FormData {
  user_id: string;
  user_password: string;
}

function LoginPopover() {
  const { setUserData } = useUserDataStore();
  const { handleSubmit, register } = useForm<FormData>();
  const route = useRouter();

  const onSubmit = async (data: FormData) => {
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
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      } else {
        setUserData(resData.userData);
        route.push("/");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <PopoverContent className="absolute -right-10">
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="user_id"
              {...register("user_id", { required: true })}
              type="text"
              placeholder="아이디"
              required
            />
            <Input
              id="user_password"
              {...register("user_password", { required: true })}
              type="password"
              placeholder="비밀번호"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            로그인
          </Button>
        </div>

        <div className="mt-4 text-center text-sm">
          계정이 없으신가요?&nbsp;
          <PopoverClose asChild>
            <Link href="/register" className="underline">
              회원가입
            </Link>
          </PopoverClose>
        </div>
      </form>
    </PopoverContent>
  );
}

export default function UserAuth({ accessToken }: { accessToken: RequestCookie | undefined }) {
  const { userData, deleteUserData, setUserData } = useUserDataStore();
  const route = useRouter();

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/auth/userData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await res.json();

        if (resData.userData) {
          setUserData(resData.userData);
        } else if (resData.error) {
          console.error(resData.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken, setUserData]);

  return (
    <>
      {!userData ? (
        <Popover>
          <PopoverTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
            <span>로그인</span>
          </PopoverTrigger>

          <LoginPopover />
        </Popover>
      ) : (
        <div className="font-semibold w-[220px] text-[14px] flex justify-around items-center">
          <div>
            <span className="">[{userData.server}]</span>&nbsp;<span>{userData.nickname}</span>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={() => {
              const confirm = window.confirm("로그아웃 하시겠습니까?");

              if (confirm) {
                deleteUserData();
                route.push("/");
              }
            }}>
            로그아웃
          </Button>
        </div>
      )}
    </>
  );
}
