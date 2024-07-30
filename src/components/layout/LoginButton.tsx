"use client";

import { useForm } from "react-hook-form";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PopoverClose } from "@radix-ui/react-popover";

import Link from "next/link";
import useUserDataStore from "@/store/userData-store";

interface FormData {
  user_id: string;
  user_password: string;
}

export default function LoginButton() {
  const { setUserData } = useUserDataStore();
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: data.user_id,
          user_password: data.user_password,
        }),
      });
      const responseData = await response.json();

      setUserData(responseData.userData);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
        로그인
      </PopoverTrigger>

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
              <Link href="/signup" className="underline">
                회원가입
              </Link>
            </PopoverClose>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
