import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TotemType = {
  id: string;
  effect: string;
  min_value: string;
  max_value: string;
};

export default function TotemEffect({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [totem, setTotem] = useState([
    {
      id: crypto.randomUUID(),
      effect: "",
      min_value: "",
      max_value: "",
    },
  ]);

  const handleSetValue = (newTotem: TotemType[]) => {
    setTotem(newTotem);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newTotem.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.effect !== "" &&
              t.effect === opt.option_sub_type &&
              opt.option_value >= (Number(t.min_value) || 0) &&
              opt.option_value <= (Number(t.max_value) || 40),
          ),
        )
      );
    });
  };

  const handleChange = (name: string, value: string, idx: number) => {
    const newTotem = totem.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newTotem);
  };

  const handleRemove = (idx: number) => {
    const newTotem = [...totem.slice(0, idx), ...totem.slice(idx + 1)];
    handleSetValue(newTotem);
  };

  const optionArray = ["체력", "지력", "솜씨", "의지", "행운", "최대 생명력", "최대 스태미나", "최대 마나"];

  return (
    <>
      {totem.map((item, idx) => {
        const selectedEffects = totem.map(t => t.effect).filter(e => e !== "");

        return (
          <React.Fragment key={item.id}>
            <Separator />

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>능력</Label>

              <Select onValueChange={value => handleChange("effect", value, idx)} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="없음" />
                </SelectTrigger>

                <SelectContent>
                  {optionArray
                    .filter(e => !selectedEffects.includes(e) || e === item.effect)
                    .map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>범위</Label>

              <div className="grid grid-cols-[1fr_30px_1fr] gap-3 items-center text-center">
                <Input type="text" placeholder="0" onChange={e => handleChange("min_value", e.target.value, idx)} />

                <span>~</span>

                <Input type="text" placeholder="40" onChange={e => handleChange("max_value", e.target.value, idx)} />
              </div>
            </div>

            <Button type="button" onClick={() => handleRemove(idx)}>
              토템 효과 삭제
            </Button>
          </React.Fragment>
        );
      })}

      <Button
        type="button"
        onClick={() => {
          totem.length !== 8
            ? setTotem(prev => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  effect: "",
                  min_value: "",
                  max_value: "",
                },
              ])
            : alert("조건을 더 이상 추가할 수 없습니다.");
        }}>
        토템 효과 추가
      </Button>
    </>
  );
}
