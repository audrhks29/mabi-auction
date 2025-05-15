import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SpecialModificationItem({ watch, currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const handleSetValue = (subType: string, optionValue: string) => {
    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);
      return matchingOptions?.some((opt: any) => opt.option_sub_type === subType && opt.option_value === optionValue);
    });
  };

  return (
    <>
      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>강화</Label>

        <Select
          value={watch(`options.${index}.option_value1`) || ""}
          onValueChange={value => {
            setValue(`options.${index}.option_value1`, value);
            handleSetValue(value, watch(`options.${index}.option_value2`) || "");
          }}
          required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="타입을 선택해주세요" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="R">R 강화</SelectItem>
            <SelectItem value="S">S 강화</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>단계</Label>

        <Select
          value={watch(`options.${index}.option_value2`) || ""}
          onValueChange={value => {
            setValue(`options.${index}.option_value2`, value);
            handleSetValue(watch(`options.${index}.option_value1`) || "", value);
          }}
          required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="단계를 선택해주세요" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1">업그레이드 1단계</SelectItem>
            <SelectItem value="2">업그레이드 2단계</SelectItem>
            <SelectItem value="3">업그레이드 3단계</SelectItem>
            <SelectItem value="4">업그레이드 4단계</SelectItem>
            <SelectItem value="5">업그레이드 5단계</SelectItem>
            <SelectItem value="6">업그레이드 6단계</SelectItem>
            <SelectItem value="7">업그레이드 7단계</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
