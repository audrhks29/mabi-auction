import { useState } from "react";

export default function TotemAdditionalOption({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [searchSubType, setSearchSubtype] = useState<string | "">("");
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");
  const [isSearchMore, setIsSearchMore] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "search_sub_type" | "search_option_value") => {
    if (type === "search_sub_type") {
      const newSearchSubType = e.target.value;
      setSearchSubtype(newSearchSubType);
      handleSetValue(newSearchSubType, searchOptionValue, isSearchMore);
    } else {
      const newSearchOptionValue = e.target.value;
      setSearchOptionValue(newSearchOptionValue);
      handleSetValue(searchSubType, newSearchOptionValue, isSearchMore);
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
      <div className="flex gap-3">
        <label className="label w-16">명칭</label>

        <input
          type="text"
          className="input w-full"
          placeholder="명칭"
          onChange={e => handleChange(e, "search_sub_type")}
          required
        />
      </div>

      <div className="flex gap-3">
        <label className="label w-16">값</label>

        <div className="flex join w-full">
          <input
            type="text"
            className="input w-full join-item"
            placeholder="값"
            onChange={e => handleChange(e, "search_option_value")}
            required
          />
          <button type="button" className="btn btn-primary join-item" onClick={toggleSearchMode}>
            {isSearchMore ? "이상" : "이하"}
          </button>
        </div>
      </div>
    </>
  );
}
