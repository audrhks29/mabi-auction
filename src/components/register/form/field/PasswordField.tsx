import ErrorMessage from "@/components/shared/register/ErrorMessage";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export default function PasswordField({
  register,
  watch,
  errors,
}: {
  register: UseFormRegister<UserDataTypes>;
  watch: UseFormWatch<UserDataTypes>;
  errors: FieldErrors<UserDataTypes>;
}) {
  const password = watch("user_password");

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[100px_1fr] items-center gap-1">
          <label htmlFor="user_password">비밀번호</label>
          <input
            id="user_password"
            {...register("user_password", {
              required: {
                value: true,
                message: "비밀번호를 입력해주세요.",
              },
              pattern: {
                value: /^[A-Za-z\d@$!%*?&]{8,20}$/,
                message: "대소문자, 숫자, 특수문자 8~20자 내로 입력해주세요.",
              },
            })}
            type="password"
            className="input input-bordered text-[12px] md:text-[14px]"
            placeholder="비밀번호"
          />
        </div>

        <ErrorMessage message={errors?.user_password?.message} />
      </div>

      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[100px_1fr] items-center gap-1">
          <label htmlFor="user_password_confirm">비밀번호 확인</label>
          <input
            id="user_password_confirm"
            {...register("user_password_confirm", {
              required: { value: true, message: "비밀번호를 다시 입력해주세요." },
              validate: value => value === password || "비밀번호가 일치하지 않습니다.",
            })}
            type="password"
            className="input input-bordered text-[12px] md:text-[14px]"
            placeholder="비밀번호 확인"
          />
        </div>

        <ErrorMessage message={errors?.user_password_confirm?.message} />
      </div>
    </>
  );
}
