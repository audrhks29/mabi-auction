"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    <main className="inner">
      <h3 className="text-[18px] text-center font-bold pb-6">회원가입</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[450px] m-auto text-[12px] lg:text-[14px]">
        <div className="grid gap-4">
          <div className="grid grid-cols-[90px_1fr_90px] items-center gap-1">
            <label htmlFor="user_id">아이디</label>
            <input
              id="user_id"
              {...register("user_id", { required: true })}
              type="text"
              placeholder="아이디"
              className="input input-bordered text-[12px] md:text-[14px]"
            />

            <button
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
              }}
              className="btn btn-neutral">
              {isDuplicationId === false ? "확인완료" : "중복확인"}
            </button>
          </div>

          <div className="grid grid-cols-[90px_1fr] items-center gap-1">
            <label htmlFor="user_password">비밀번호</label>
            <input
              id="user_password"
              {...register("user_password", { required: true })}
              type="password"
              className="input input-bordered text-[12px] md:text-[14px]"
              placeholder="비밀번호"
            />
          </div>

          <div className="grid grid-cols-[90px_1fr] items-center gap-1">
            <label htmlFor="user_password_confirm">비밀번호 확인</label>
            <input
              id="user_password_confirm"
              {...register("user_password_confirm", { required: true })}
              type="password"
              className="input input-bordered text-[12px] md:text-[14px]"
              placeholder="비밀번호 확인"
            />
          </div>

          <div className="grid grid-cols-[90px_1fr] items-center gap-1">
            <label htmlFor="user_server">서버</label>
            <select
              onChange={e => setValue("user_server", e.target.value)}
              className="select select-bordered text-[12px] md:text-[14px]">
              <option disabled selected>
                서버를 선택해주세요
              </option>
              <option value="류트">류트</option>
              <option value="만돌린">만돌린</option>
              <option value="하프">하프</option>
              <option value="울프">울프</option>
            </select>
          </div>

          <div className="grid grid-cols-[90px_1fr] items-center gap-1">
            <label htmlFor="user_race">종족</label>
            <select
              onChange={e => setValue("user_race", e.target.value)}
              className="select select-bordered text-[12px] md:text-[14px]">
              <option disabled selected>
                종족을 선택해주세요
              </option>
              <option value="인간">인간</option>
              <option value="엘프">엘프</option>
              <option value="자이언트">자이언트</option>
            </select>
          </div>

          <div className="grid grid-cols-[90px_1fr] items-center gap-1">
            <label htmlFor="user_nickName">닉네임</label>
            <input
              id="user_nickName"
              {...register("user_nickName", { required: true })}
              type="text"
              className="input input-bordered text-[12px] md:text-[14px]"
            />
          </div>

          <button type="submit" className="w-full btn btn-neutral">
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
}
