import React from "react";

interface ReforgeOptionType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

const ReforgeOption = ({ option, index, setSelectedItemOptions }: ReforgeOptionType) => {
  const handleCountChange = (count: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: count,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.length === Number(count);
      },
    });
  };

  const handleInputValueChange = (inputValue: string) => {
    setSelectedItemOptions(index, {
      option_value: inputValue,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return (
          matchingOptions?.length === Number(option.option_sub_type) &&
          matchingOptions?.some((opt: any) => opt.option_value.includes(inputValue))
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">갯수</label>

        <select
          className="select w-full"
          value={option.option_sub_type || ""}
          onChange={e => handleCountChange(e.target.value)}>
          <option value="">없음</option>
          {[1, 2, 3].map(num => (
            <option key={num} value={num}>
              {num}개
            </option>
          ))}
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">명칭</label>

          <input
            type="text"
            className="input w-full"
            placeholder="명칭"
            value={option.option_value || ""}
            onChange={e => handleInputValueChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default ReforgeOption;
