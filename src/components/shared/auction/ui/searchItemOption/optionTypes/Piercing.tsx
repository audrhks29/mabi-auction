import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Piercing({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");
  const [isSearchMore, setIsSearchMore] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchOptionValue = e.target.value;
    setSearchOptionValue(newSearchOptionValue);
    handleSetValue(newSearchOptionValue, isSearchMore);
  };

  const handleSetValue = (optionValue: string, isMore: boolean) => {
    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);
      const extractNumbers = (val: string): number => Number(val.replace(/\D/g, ""));

      return matchingOptions?.some((opt: any) =>
        isMore
          ? Number(opt.option_value) + (opt.option_value2 && extractNumbers(opt.option_value2)) >= Number(optionValue)
          : Number(opt.option_value) + (opt.option_value2 && extractNumbers(opt.option_value2)) <= Number(optionValue),
      );
    });
  };

  const toggleSearchMode = () => {
    const newIsSearchMore = !isSearchMore;
    setIsSearchMore(newIsSearchMore);

    handleSetValue(searchOptionValue, newIsSearchMore);
  };

  return (
    <div className="grid grid-cols-[30px_1fr_60px] gap-3 items-center">
      <Label>값</Label>

      <Input type="text" placeholder="값" onChange={handleChange} required />

      <Button type="button" onClick={toggleSearchMode}>
        {isSearchMore ? "이상" : "이하"}
      </Button>
    </div>
  );
}
