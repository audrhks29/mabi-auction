import { useState } from "react";

export default function MoreOrLess({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [isSearchMore, setIsSearchMore] = useState<boolean>(true);
  const [searchOptionValue, setSearchOptionValue] = useState<string | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchOptionValue = e.target.value;
    setSearchOptionValue(newSearchOptionValue);
    handleSetValue(newSearchOptionValue, isSearchMore);
  };

  const handleSetValue = (optionValue: string, isMore: boolean) => {
    setValue(`options.${index}.calcFunc`, (item: any) => {
      return item.item_option.some((opt: any) => {
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
          return isMore
            ? Number(opt.option_value2) >= Number(optionValue)
            : Number(opt.option_value2) <= Number(optionValue);
        } else if (currentOptionType === "숙련") {
          return isMore
            ? Number(opt.option_value) >= Number(optionValue)
            : Number(opt.option_value) <= Number(optionValue);
        } else if (["크리티컬", "밸런스"].includes(currentOptionType)) {
          return isMore
            ? Number(opt.option_value?.replace("%", "") || 0) >= Number(optionValue)
            : Number(opt.option_value?.replace("%", "") || 0) <= Number(optionValue);
        } else if (["크기"].includes(currentOptionType)) {
          return isMore
            ? Number(opt.option_value?.replace("cm", "") || 0) >= Number(optionValue)
            : Number(opt.option_value?.replace("cm", "") || 0) <= Number(optionValue);
        }
        return false;
      });
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
