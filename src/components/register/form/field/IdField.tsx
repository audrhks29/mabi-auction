import { Dispatch, SetStateAction, useEffect } from "react";

import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

import ErrorMessage from "@/components/shared/register/ErrorMessage";
import idDuplicateCheck from "@/utils/register/idDuplicateCheck";

export default function IdField({
  register,
  watch,
  isDuplicationId,
  setIsDuplicationId,
  errors,
}: {
  register: UseFormRegister<UserDataTypes>;
  watch: UseFormWatch<UserDataTypes>;
  isDuplicationId: boolean | null;
  setIsDuplicationId: Dispatch<SetStateAction<boolean | null>>;
  errors: FieldErrors<UserDataTypes>;
}) {
  const id = watch("user_id");

  useEffect(() => {
    setIsDuplicationId(null);
  }, [id, setIsDuplicationId]);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-[100px_1fr_90px] items-center gap-1">
        <label htmlFor="user_id">아이디</label>
        <input
          id="user_id"
          {...register("user_id", {
            required: { value: true, message: "아이디를 입력해주세요." },
            pattern: { value: /^[a-zA-Z0-9]{6,20}$/, message: "영문+숫자 조합 6~20자 내로 입력해주세요." },
          })}
          type="text"
          placeholder="아이디"
          className="input input-bordered text-[12px] md:text-[14px]"
          disabled={isDuplicationId === false}
        />

        <button
          type="button"
          onClick={() => idDuplicateCheck(id, setIsDuplicationId)}
          disabled={isDuplicationId === false}
          className="btn btn-neutral">
          {isDuplicationId === false ? "확인완료" : "중복확인"}
        </button>
      </div>

      <ErrorMessage message={errors?.user_id?.message} />
    </div>
  );
}
