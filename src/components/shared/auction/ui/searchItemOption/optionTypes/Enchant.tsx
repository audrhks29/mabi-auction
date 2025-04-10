import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type EnchantType = {
  id: string;
  type: "접두" | "접미" | string | null;
  name: string | null;
};

export default function Enchant({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [enchant, setEnchant] = useState<EnchantType[]>([
    {
      id: crypto.randomUUID(),
      type: null,
      name: null,
    },
  ]);

  const handleSetValue = (newEnchant: EnchantType[]) => {
    setEnchant(newEnchant);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newEnchant.every(t =>
          matchingOptions.some(
            (opt: any) => t.type !== "" && t.type === opt.option_sub_type && opt.option_value.includes(t.name),
          ),
        )
      );
    });
  };

  const handleChange = (name: string, value: string, idx: number) => {
    const newEnchant = enchant.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newEnchant);
  };

  const handleRemove = (idx: number) => {
    const newEnchant = [...enchant.slice(0, idx), ...enchant.slice(idx + 1)];
    handleSetValue(newEnchant);
  };

  const optionArray = ["접두", "접미"];

  return (
    <>
      {enchant.map((item, idx) => {
        const selectedEffects = enchant.map(t => t.type).filter(e => e !== "");

        return (
          <React.Fragment key={item.id}>
            <Separator />

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>위치</Label>

              <Select onValueChange={value => handleChange("type", value, idx)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="옵션 타입 선택" />
                </SelectTrigger>
                <SelectContent>
                  {optionArray
                    .filter(e => !selectedEffects.includes(e) || e === item.type)
                    .map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>명칭</Label>

              <Input
                type="text"
                placeholder="인챈트 이름"
                onChange={e => handleChange("name", e.target.value, idx)}
                required
              />
            </div>

            {currentOptionType === "인챈트" && (
              <Button type="button" onClick={() => handleRemove(idx)}>
                인챈트 삭제
              </Button>
            )}
          </React.Fragment>
        );
      })}

      {currentOptionType === "인챈트" && (
        <Button
          type="button"
          onClick={() => {
            Enchant.length !== 2
              ? setEnchant(prev => [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    type: "",
                    name: "",
                  },
                ])
              : alert("조건을 더 이상 추가할 수 없습니다.");
          }}>
          인챈트 추가
        </Button>
      )}
    </>
  );
}
