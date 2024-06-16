"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface FormData {
  user_id: string;
  user_password: string;
  user_password_confirm: string;
  user_server: string;
  user_nickName: string;
}

export default function SignupPage() {
  const { handleSubmit, register, setValue } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <main className="inner grid gap-3">
      <h2 className="text-center text-[24px] font-bold">회원가입</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="m-auto w-[450px]">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-[90px_1fr_80px] items-center gap-3">
                <Label htmlFor="user_id">아이디</Label>
                <Input id="user_id" {...register("user_id", { required: true })} type="text" placeholder="아이디" />
                <Button type="button">중복확인</Button>
              </div>

              <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                <Label htmlFor="user_password">비밀번호</Label>
                <Input id="user_password" {...register("user_password", { required: true })} type="password" />
              </div>

              <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                <Label htmlFor="user_password_confirm">비밀번호 확인</Label>
                <Input
                  id="user_password_confirm"
                  {...register("user_password_confirm", { required: true })}
                  type="password"
                />
              </div>

              <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                <Label htmlFor="user_server">서버</Label>
                <Select onValueChange={value => setValue("user_server", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="서버를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="류트">류트</SelectItem>
                      <SelectItem value="만돌린">만돌린</SelectItem>
                      <SelectItem value="하프">하프</SelectItem>
                      <SelectItem value="울프">울프</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-[90px_1fr] items-center gap-3">
                <Label htmlFor="user_nickName">닉네임</Label>
                <Input id="user_nickName" {...register("user_nickName", { required: true })} type="text" />
              </div>

              <Button type="submit" className="w-full">
                회원가입
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
