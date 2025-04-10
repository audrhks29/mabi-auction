import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SpecialModificationItem({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [searchSubType, setSearchSubtype] = useState<string | "">("");
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");

  const handleChange = (value: string, type: "search_sub_type" | "search_option_value") => {
    if (type === "search_sub_type") {
      setSearchSubtype(value);
      handleSetValue(value, searchOptionValue);
    } else {
      setSearchOptionValue(value);
      handleSetValue(searchSubType, value);
    }
  };

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

        <Select onValueChange={value => handleChange(value, "search_sub_type")} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="없음" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="">없음</SelectItem>
            <SelectItem value="R">R 강화</SelectItem>
            <SelectItem value="S">S 강화</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {searchSubType !== "" && (
        <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
          <Label>단계</Label>

          <Select onValueChange={value => handleChange(value, "search_option_value")} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="없음" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="">없음</SelectItem>
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
      )}
    </>
  );
}
