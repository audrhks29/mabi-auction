interface TotemModificationLimitType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}
export default function TotemModificationLimit({ option, index, setSelectedItemOptions }: TotemModificationLimitType) {
  const handleTypeChange = (type: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: type,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type === type);
      },
    });
  };

  const handleInputValueChange = (inputValue: string) => {
    setSelectedItemOptions(index, {
      option_value: inputValue,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) =>
            opt.option_sub_type === option.option_sub_type && Number(opt.option_value) >= Number(inputValue),
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">옵션</label>

        <select className="select w-full" onChange={e => handleTypeChange(e.target.value)}>
          <option value="">강화</option>
          <option value="남은 일반 강화 횟수">남은 일반 강화 횟수</option>
          <option value="남은 추가 강화 횟수">남은 추가 강화 횟수</option>
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">횟수</label>

          <input
            type="text"
            className="input w-full"
            value={option.option_value || ""}
            onChange={e => handleInputValueChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
