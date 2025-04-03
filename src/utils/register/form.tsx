import { ControllerRenderProps } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import idDuplicateCheck from "./idDuplicateCheck";
import { Dispatch, SetStateAction } from "react";

type FormFieldItem = {
  fieldName: FieldNameTypes;
  labelText: string;
  component: (field: ControllerRenderProps<any, FieldNameTypes>) => React.ReactNode;
};

type FieldNameTypes =
  | "user_id"
  | "user_nickname"
  | "user_server"
  | "user_race"
  | "user_password"
  | "user_password_confirm";

const serverArray = ["류트", "만돌린", "하프", "울프"];

const raceArray = ["인간", "엘프", "자이언트"];

export const registerFormArray = (
  isDuplicationId: boolean | null,
  setIsDuplicationId: Dispatch<SetStateAction<boolean | null>>,
): FormFieldItem[] => [
  {
    fieldName: "user_id",
    labelText: "아이디",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => (
      <FormControl>
        <div className="flex gap-2">
          <Input {...field} disabled={isDuplicationId === false} />
          <Button
            type="button"
            onClick={() => idDuplicateCheck(field.value, setIsDuplicationId)}
            disabled={isDuplicationId === false}>
            {isDuplicationId === false ? "확인완료" : "중복확인"}
          </Button>
        </div>
      </FormControl>
    ),
  },
  {
    fieldName: "user_password",
    labelText: "비밀번호",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => (
      <FormControl>
        <Input {...field} type="password" />
      </FormControl>
    ),
  },
  {
    fieldName: "user_password_confirm",
    labelText: "비밀번호 확인",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => (
      <FormControl>
        <Input {...field} type="password" />
      </FormControl>
    ),
  },
  {
    fieldName: "user_server",
    labelText: "서버",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl className="w-full">
          <SelectTrigger>
            <SelectValue placeholder="서버를 선택해주세요" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {serverArray.map((option, idx) => (
            <SelectItem key={idx} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    fieldName: "user_race",
    labelText: "종족",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl className="w-full">
          <SelectTrigger>
            <SelectValue placeholder="종족을 선택해주세요" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {raceArray.map((option, idx) => (
            <SelectItem key={idx} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    fieldName: "user_nickname",
    labelText: "닉네임",
    component: (field: ControllerRenderProps<any, FieldNameTypes>) => <Input {...field} />,
  },
];
