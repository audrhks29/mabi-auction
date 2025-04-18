import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EcoStoneUniqueAbility({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [searchSubType, setSearchSubtype] = useState<string | "">("");
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");
  const [isSearchMore, setIsSearchMore] = useState<boolean>(true);

  const handleChange = (value: string, type: "search_sub_type" | "search_option_value") => {
    if (type === "search_sub_type") {
      setSearchSubtype(value);
      handleSetValue(value, searchOptionValue, isSearchMore);
    } else {
      setSearchOptionValue(value);
      handleSetValue(searchSubType, value, isSearchMore);
    }
  };

  const handleSetValue = (subType: string, optionValue: string, isMore: boolean) => {
    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);
      return matchingOptions?.some(
        (opt: any) =>
          opt.option_sub_type === subType &&
          (isMore ? Number(opt.option_value) >= Number(optionValue) : Number(opt.option_value) <= Number(optionValue)),
      );
    });
  };

  const toggleSearchMode = () => {
    const newIsSearchMore = !isSearchMore;
    setIsSearchMore(newIsSearchMore);

    handleSetValue(searchSubType, searchOptionValue, newIsSearchMore);
  };

  return (
    <>
      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>능력</Label>

        <Select onValueChange={value => handleChange(value, "search_sub_type")} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="없음" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="생명력, 마나, 스태미나">생명력, 마나, 스태미나</SelectItem>
            <SelectItem value="체력">체력</SelectItem>
            <SelectItem value="지력">지력</SelectItem>
            <SelectItem value="솜씨">솜씨</SelectItem>
            <SelectItem value="의지">의지</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {searchSubType && (
        <div className="grid grid-cols-[30px_1fr_60px] gap-3 items-center">
          <Label>값</Label>

          <Input
            type="text"
            placeholder="값"
            onChange={e => handleChange(e.target.value, "search_option_value")}
            required
          />

          <Button type="button" onClick={toggleSearchMode}>
            {isSearchMore ? "이상" : "이하"}
          </Button>
        </div>
      )}
    </>
  );
}
