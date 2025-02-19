import { useState } from "react";

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
    <div className="flex gap-3">
      <label className="label w-16">값</label>

      <div className="flex join w-full">
        <input type="text" className="input w-full join-item" placeholder="값" onChange={handleChange} required />

        <button type="button" className="btn btn-primary join-item" onClick={toggleSearchMode}>
          {isSearchMore ? "이상" : "이하"}
        </button>
      </div>
    </div>
  );
}
