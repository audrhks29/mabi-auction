import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PetInfoType = {
  id: string;
  info_name: string;
  type: string;
  min_value: string;
  max_value: string;
};

export default function PetInformation({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [petInfo, setPetInfo] = useState<PetInfoType[]>([
    {
      id: crypto.randomUUID(),
      info_name: "",
      type: "",
      min_value: "",
      max_value: "",
    },
  ]);

  const handleSetValue = (newPetInfo: PetInfoType[]) => {
    setPetInfo(newPetInfo);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newPetInfo.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.info_name !== "" &&
              (t.info_name === "종족명"
                ? opt.option_value.includes(t.type)
                : t.info_name === opt.option_sub_type &&
                  opt.option_value >= (Number(t.min_value) || 0) &&
                  opt.option_value <= (Number(t.max_value) || 100000)),
          ),
        )
      );
    });
  };

  const handleChange = (name: string, value: string, idx: number) => {
    const newPetInfo = petInfo.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newPetInfo);
  };

  const handleRemove = (idx: number) => {
    const newPetInfo = [...petInfo.slice(0, idx), ...petInfo.slice(idx + 1)];
    handleSetValue(newPetInfo);
  };

  const optionArray = [
    "종족명",
    "펫 포인트",
    "레벨",
    "누적 레벨",
    "남은 분양 횟수",
    "나이",
    "생명력",
    "마나",
    "스태미나",
    "체력",
    "의지",
    "솜씨",
    "지력",
    "행운",
    "최대 소환 시간",
  ];

  return (
    <>
      {petInfo.map((info, idx) => {
        const selectedEffects = petInfo.map(t => t.info_name).filter(e => e !== "");

        return (
          <React.Fragment key={info.id}>
            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>능력</Label>

              <Select onValueChange={value => handleChange("info_name", value, idx)} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="없음" />
                </SelectTrigger>

                <SelectContent>
                  {optionArray
                    .filter(e => !selectedEffects.includes(e) || e === info.info_name)
                    .map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {petInfo[index].info_name === "종족명" ? (
              <div className="flex gap-3">
                <Label>종족</Label>

                <Input type="text" onChange={e => handleChange("type", e.target.value, idx)} />
              </div>
            ) : (
              <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                <Label>범위</Label>

                <div className="grid grid-cols-[1fr_30px_1fr] gap-3 items-center text-center">
                  <Input type="text" placeholder="0" onChange={e => handleChange("min_value", e.target.value, idx)} />

                  <span>~</span>

                  <Input
                    type="text"
                    placeholder="100000"
                    onChange={e => handleChange("max_value", e.target.value, idx)}
                  />
                </div>
              </div>
            )}

            <Button type="button" onClick={() => handleRemove(idx)}>
              펫 옵션 삭제
            </Button>
          </React.Fragment>
        );
      })}

      <Button
        type="button"
        onClick={() =>
          setPetInfo(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              info_name: "",
              type: "",
              min_value: "",
              max_value: "",
            },
          ])
        }>
        펫 옵션 추가
      </Button>
    </>
  );
}
