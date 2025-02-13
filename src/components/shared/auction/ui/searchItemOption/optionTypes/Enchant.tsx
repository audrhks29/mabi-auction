interface EnchantType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function Enchant({ option, index, setSelectedItemOptions }: EnchantType) {
  const handleTypeChange = (type: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: type,
      calcFunc: item => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type === type);
      },
    });
  };

  const handleInputValueChange = (inputValue: string) => {
    setSelectedItemOptions(index, {
      option_value: inputValue,
      calcFunc: item => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) => opt.option_sub_type === option.option_sub_type && opt.option_value.includes(inputValue),
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">위치</label>

        <select className="select w-full" onChange={e => handleTypeChange(e.target.value)}>
          <option value="">없음</option>
          <option value="접두">접두</option>
          <option value="접미">접미</option>
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">명칭</label>

          <input
            type="text"
            className="input w-full"
            placeholder="인챈트 이름"
            value={option.option_value || ""}
            onChange={e => handleInputValueChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
