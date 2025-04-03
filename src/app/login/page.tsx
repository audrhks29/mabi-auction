"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useSubmitLogin } from "@/hooks/auth/useSubmitLogin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  const { handleSubmit, register, reset } = useForm<UserLoginTypes>();
  const route = useRouter();

  const { mutate } = useSubmitLogin(route, reset);

  const onSubmit = (data: UserLoginTypes) => mutate(data);
  return (
    <main className="inner">
      <div className="flex flex-col gap-6 max-w-[450px] m-auto text-[12px] lg:text-[14px]">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl text-center">로그인</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="user_id" className="font-bold">
                    아이디
                  </Label>
                  <Input id="user_id" {...register("user_id", { required: true })} type="text" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="user_password" className="font-bold">
                    비밀번호
                  </Label>
                  <Input
                    id="user_password"
                    {...register("user_password", { required: true })}
                    type="password"
                    required
                  />
                </div>

                <Button type="submit">로그인</Button>
              </div>

              <div className="text-muted-foreground text-sm text-center mt-4">
                <span className="mr-1">계정이 없으신가요</span>
                <a href="/register" className="underline">
                  회원가입
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
