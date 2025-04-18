import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TotemAdditionalOption({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
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
          opt.option_sub_type.includes(subType) &&
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
        <Label>명칭</Label>

        <Input
          type="text"
          className="input w-full"
          placeholder="명칭"
          onChange={e => handleChange(e.target.value, "search_sub_type")}
          required
        />
      </div>

      <div className="grid grid-cols-[30px_1fr_60px] gap-3 items-center">
        <Label>값</Label>

        <Input
          type="text"
          placeholder="값"
          onChange={e => handleChange(e.target.value, "search_option_value")}
          required
        />

        <Button type="button" variant="outline" onClick={toggleSearchMode}>
          {isSearchMore ? "이상" : "이하"}
        </Button>
      </div>
    </>
  );
}
