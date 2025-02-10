interface SpecialModificationItemType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function SpecialModificationItem({
  option,
  index,
  setSelectedItemOptions,
}: SpecialModificationItemType) {
  const handleTypeChange = (type: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: type,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type === type);
      },
    });
  };

  const handleUpgradeChange = (selectedValue: string) => {
    setSelectedItemOptions(index, {
      option_value: selectedValue,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) => opt.option_sub_type === option.option_sub_type && opt.option_value === selectedValue,
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">강화</label>

        <select className="select w-full" onChange={e => handleTypeChange(e.target.value)}>
          <option value="">없음</option>
          <option value="R">R 강화</option>
          <option value="S">S 강화</option>
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">단계</label>

          <select className="select w-full" onChange={e => handleUpgradeChange(e.target.value)}>
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
