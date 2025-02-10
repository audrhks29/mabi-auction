interface EcoStoneUniqueAbilityType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function EcoStoneUniqueAbility({ option, index, setSelectedItemOptions }: EcoStoneUniqueAbilityType) {
  const handleTypeChange = (type: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: type,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type === type);
      },
    });
  };

  const handleStatChange = (stat: string) => {
    setSelectedItemOptions(index, {
      option_value: stat,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) => opt.option_sub_type === option.option_sub_type && opt.option_value >= stat,
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">능력</label>

        <select className="select w-full" onChange={e => handleTypeChange(e.target.value)}>
          <option value="">없음</option>
          <option value="생명력, 마나, 스태미나">생명력, 마나, 스태미나</option>
          <option value="체력">체력</option>
          <option value="지력">지력</option>
          <option value="솜씨">솜씨</option>
          <option value="의지">의지</option>
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">값</label>

          <input
            type="text"
            className="input w-full"
            placeholder="값"
            value={option.option_value || ""}
            onChange={e => handleStatChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
