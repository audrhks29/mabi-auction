"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  user_id: string;
  user_password: string;
  user_password_confirm: string;
  user_server: string;
  user_race: string;
  user_nickName: string;
}

export default function RegisterPage() {
  const { handleSubmit, register, setValue, watch } = useForm<FormData>();
  const [isDuplicationId, setIsDuplicationId] = useState<boolean | null>(null);
  const route = useRouter();

  const id = watch("user_id");

  useEffect(() => {
    setIsDuplicationId(null);
  }, [id]);

  const onSubmit = async (data: FormData) => {
    if (isDuplicationId) alert("가입이 불가능한 아이디입니다.");
    else if (isDuplicationId === null) alert("아이디 중복을 확인해주세요.");
    else if (isDuplicationId === false) {
      const confirm = window.confirm(
        `가입정보를 확인해주세요.\n아이디 : ${data.user_id}\n서버 : ${data.user_server}\n종족 : ${data.user_race}\n닉네임 : ${data.user_nickName}`,
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
              server: data.user_server,
              race: data.user_race,
              nickname: data.user_nickName,
              skill_data: [],
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
                <Button
                  type="button"
                  onClick={async () => {
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
                  }}>
                  {isDuplicationId === false ? "확인완료" : "중복확인"}
                </Button>
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
                <Label htmlFor="user_race">종족</Label>
                <Select onValueChange={value => setValue("user_race", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="종족을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="인간">인간</SelectItem>
                      <SelectItem value="엘프">엘프</SelectItem>
                      <SelectItem value="자이언트">자이언트</SelectItem>
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
