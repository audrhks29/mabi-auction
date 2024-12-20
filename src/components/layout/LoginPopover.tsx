import Link from "next/link";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

import useUserDataStore from "@/store/userData-store";
import { useRouter } from "next/navigation";

interface FormData {
  user_id: string;
  user_password: string;
}

export default function LoginPopover() {
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
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setUserData(resData.userData);
        route.push("/");
      }
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        로그인
      </div>

      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
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

            <button type="submit" className="btn">
              로그인
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?&nbsp;
            <a href="/register" className="underline">
              회원가입
            </a>
          </div>
        </form>
      </ul>
    </div>
  );
}
