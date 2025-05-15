import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MoreOrLess({ watch, currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const optionValue = watch(`options.${index}.option_value1`);
  const isMore = watch(`options.${index}.isMore`);
  // console.log(optionValue);
  // console.log(isMore);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(`options.${index}.option_value1`, value);
    handleSetValue(value, isMore);
  };

  const handleSetValue = (value: string, more: boolean) => {
    // console.log(typeof more);
    // console.log(value);
    // console.log(optionValue);
    console.log(more);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      // console.log(item);
      return item.item_option.some((opt: any) => {
        // console.log(opt.option_value2);
        if (
          [
            "공격",
            "내구력",
            "남은 전용 해제 가능 횟수",
            "마법 방어력",
            "마법 보호",
            "방어력",
            "보호",
            "내구도",
            "남은 거래 횟수",
            "남은 사용 횟수",
            "품질",
          ].includes(currentOptionType)
        ) {
          return more ? Number(opt.option_value2) >= Number(value) : Number(opt.option_value2) <= Number(value);
        } else if (currentOptionType === "숙련") {
          return more ? Number(opt.option_value) >= Number(value) : Number(opt.option_value) <= Number(value);
        } else if (["크리티컬", "밸런스"].includes(currentOptionType)) {
          return more
            ? Number(opt.option_value?.replace("%", "") || 0) >= Number(value)
            : Number(opt.option_value?.replace("%", "") || 0) <= Number(value);
        } else if (["크기"].includes(currentOptionType)) {
          return more
            ? Number(opt.option_value?.replace("cm", "") || 0) >= Number(value)
            : Number(opt.option_value?.replace("cm", "") || 0) <= Number(value);
        }
      });
    });
  };

  const toggleSearchMode = () => {
    // console.log(!isMore);
    setValue(`options.${index}.isMore`, !isMore);
    // setIsSearchMore(newIsSearchMore);
    handleSetValue(optionValue, !isMore);
  };

  return (
    <div className="grid grid-cols-[30px_1fr_60px] gap-3 items-center">
      <Label>값</Label>

      <Input
        type="text"
        defaultValue={optionValue}
        className="w-full"
        placeholder="값"
        onChange={handleChange}
        required
      />

      <Button type="button" variant="outline" onClick={toggleSearchMode}>
        {isMore ? "이상" : "이하"}
      </Button>
    </div>
  );
}
