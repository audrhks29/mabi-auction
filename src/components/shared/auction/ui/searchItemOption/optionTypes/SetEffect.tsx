import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SetEffectType = {
  id: string;
  name: string;
  min_value: string;
  max_value: string;
};

export default function SetEffect({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [setEffectAmount, setSetEffectAmount] = useState("0");
  const [setEffectOption, setSetEffectOption] = useState<SetEffectType[]>([]);

  const handleSetValue = (newSetEffectOption: SetEffectType[], newSetEffectAmount: string) => {
    setSetEffectOption(newSetEffectOption);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions?.length === Number(newSetEffectAmount) &&
        newSetEffectOption.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.name !== "" &&
              opt.option_value.includes(t.name) &&
              Number(opt.option_value2) >= (Number(t.min_value) || 0) &&
              Number(opt.option_value2) <= (Number(t.max_value) || 10),
          ),
        )
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newSetEffectOption = setEffectOption.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newSetEffectOption, setEffectAmount);
  };

  const handleAmountChange = (value: string) => {
    setSetEffectAmount(value);
    handleSetValue(setEffectOption, value);
  };

  const handleRemove = (idx: number) => {
    const newSetEffectOption = [...setEffectOption.slice(0, idx), ...setEffectOption.slice(idx + 1)];
    handleSetValue(newSetEffectOption, setEffectAmount);
  };

  return (
    <>
      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>갯수</Label>

        <Select onValueChange={handleAmountChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="없음" />
          </SelectTrigger>

          <SelectContent>
            {["1", "2", "3"].map(num => (
              <SelectItem key={num} value={num}>
                {num}개
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {setEffectOption.map((item, idx) => {
        return (
          <React.Fragment key={item.id}>
            <Separator />

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>명칭</Label>

              <Input type="text" name="name" placeholder="명칭" onChange={e => handleChange(e, idx)} />
            </div>

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>레벨</Label>

              <div className="grid grid-cols-[1fr_30px_1fr] gap-3 items-center text-center">
                <Input type="text" name="min_value" placeholder="0" onChange={e => handleChange(e, idx)} />

                <span>~</span>

                <Input type="text" name="max_value" placeholder="25" onChange={e => handleChange(e, idx)} />
              </div>
            </div>

            <Button type="button" onClick={() => handleRemove(idx)}>
              세트 효과 삭제
            </Button>
          </React.Fragment>
        );
      })}

      <Button
        type="button"
        onClick={() => {
          setEffectOption.length !== 3
            ? setSetEffectOption(prev => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  min_value: "",
                  max_value: "",
                },
              ])
            : alert("옵션을 더 이상 추가할 수 없습니다.");
        }}>
        세트 효과 추가
      </Button>
    </>
  );
}
