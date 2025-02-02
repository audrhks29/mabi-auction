import { FieldErrors, UseFormRegister } from "react-hook-form";

import ErrorMessage from "@/components/shared/register/ErrorMessage";
import React from "react";

const selectItemArray = [
  {
    id: 1,
    form_name: "user_server",
    label_text: "서버",
    error_message: "서버를 선택해주세요.",
    options: ["류트", "만돌린", "하프", "울프"],
  },
  {
    id: 2,
    form_name: "user_race",
    label_text: "종족",
    error_message: "종족을 선택해주세요.",
    options: ["인간", "엘프", "자이언트"],
  },
];

export default function SelectField({
  register,
  errors,
}: {
  register: UseFormRegister<UserDataTypes>;
  errors: FieldErrors<UserDataTypes>;
}) {
  return (
    <React.Fragment>
      {selectItemArray.map(item => (
        <div key={item.id} className="flex flex-col gap-1">
          <div className="grid grid-cols-[100px_1fr] items-center gap-1">
            <label htmlFor={item.form_name}>{item.label_text}</label>
            <select
              {...register(item.form_name as keyof UserDataTypes, {
                required: { value: true, message: item.error_message },
              })}
              className="select select-bordered text-[12px] md:text-[14px]">
              <option value="" hidden>
                {item.error_message}
              </option>
              {item.options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <ErrorMessage message={errors?.[item.form_name as keyof UserDataTypes]?.message} />
        </div>
      ))}
    </React.Fragment>
  );
}
