import { FieldErrors, UseFormRegister } from "react-hook-form";

import ErrorMessage from "@/components/shared/register/ErrorMessage";

export default function NicknameField({
  register,
  errors,
}: {
  register: UseFormRegister<UserDataTypes>;
  errors: FieldErrors<UserDataTypes>;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[100px_1fr] items-center gap-1">
        <label htmlFor="user_nickname">닉네임</label>
        <input
          id="user_nickname"
          {...register("user_nickname", {
            required: { value: true, message: "닉네임을 입력해주세요." },
            pattern: {
              value: /^[a-zA-Z0-9ㄱ-ㅎ가-힣0-9]{2,12}$/,
              message: "한글, 영문, 숫자 2~12글자 내로 입력해주세요.",
            },
          })}
          type="text"
          className="input input-bordered text-[12px] md:text-[14px]"
          placeholder="닉네임"
        />
      </div>

      <ErrorMessage message={errors?.user_nickname?.message} />
    </div>
  );
}
