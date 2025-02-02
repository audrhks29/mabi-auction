"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import IdField from "./field/IdField";
import PasswordField from "./field/PasswordField";
import SelectField from "./field/SelectField";
import NicknameField from "./field/NicknameField";

import registerSubmit from "@/utils/register/registerSubmit";

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UserDataTypes>();
  const route = useRouter();
  const [isDuplicationId, setIsDuplicationId] = useState<boolean | null>(null);

  const onSubmit = (data: UserDataTypes) => registerSubmit(data, isDuplicationId, route);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[450px] m-auto text-[12px] lg:text-[14px]">
      <div className="grid gap-2">
        <IdField
          register={register}
          watch={watch}
          isDuplicationId={isDuplicationId}
          setIsDuplicationId={setIsDuplicationId}
          errors={errors}
        />
        <PasswordField register={register} watch={watch} errors={errors} />
        <SelectField register={register} errors={errors} />
        <NicknameField register={register} errors={errors} />

        <button type="submit" className="w-full btn btn-neutral">
          회원가입
        </button>
      </div>
    </form>
  );
}
