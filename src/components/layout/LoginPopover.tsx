import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useSubmitLogin } from "@/hooks/auth/useSubmitLogin";

export default function LoginPopover() {
  const { handleSubmit, register } = useForm<UserLoginTypes>();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const route = useRouter();

  const { mutate } = useSubmitLogin(route);

  const onSubmit = (data: UserLoginTypes) => mutate(data);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    isOpen
      ? document.addEventListener("mousedown", handleClickOutside)
      : document.removeEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 로그인 버튼 클릭 시 드롭다운 토글 */}
      <button onClick={() => setIsOpen(prev => !prev)} className="btn btn-neutral m-1">
        로그인
      </button>

      {/* 드롭다운 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-base-300 rounded-box shadow-lg p-2 z-10">
          <form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <input
                  id="user_id"
                  className="input input-bordered w-full"
                  {...register("user_id", { required: true })}
                  type="text"
                  placeholder="아이디"
                  required
                />
                <input
                  id="user_password"
                  className="input input-bordered w-full"
                  {...register("user_password", { required: true })}
                  type="password"
                  placeholder="비밀번호"
                  required
                />
              </div>

              <button type="submit" className="btn w-full">
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
        </div>
      )}
    </div>
  );
}
