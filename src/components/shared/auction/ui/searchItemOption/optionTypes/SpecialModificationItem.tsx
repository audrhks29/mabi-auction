import { useState } from "react";
export default function SpecialModificationItem({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [searchSubType, setSearchSubtype] = useState<string | "">("");
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "search_sub_type" | "search_option_value",
  ) => {
    if (type === "search_sub_type") {
      const newSearchSubType = e.target.value;
      setSearchSubtype(newSearchSubType);
      handleSetValue(newSearchSubType, searchOptionValue);
    } else {
      const newSearchOptionValue = e.target.value;
      setSearchOptionValue(newSearchOptionValue);
      handleSetValue(searchSubType, newSearchOptionValue);
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
      <div className="flex gap-3">
        <label className="label w-16">강화</label>

        <select className="select w-full" onChange={e => handleChange(e, "search_sub_type")} required>
          <option value="">없음</option>
          <option value="R">R 강화</option>
          <option value="S">S 강화</option>
        </select>
      </div>

      {searchSubType !== "" && (
        <div className="flex gap-3">
          <label className="label w-16">단계</label>

          <select className="select w-full" onChange={e => handleChange(e, "search_option_value")} required>
            <option value="">없음</option>
            <option value="1">업그레이드 1단계</option>
            <option value="2">업그레이드 2단계</option>
            <option value="3">업그레이드 3단계</option>
            <option value="4">업그레이드 4단계</option>
            <option value="5">업그레이드 5단계</option>
            <option value="6">업그레이드 6단계</option>
            <option value="7">업그레이드 7단계</option>
          </select>
        </div>
      )}
    </>
  );
}
