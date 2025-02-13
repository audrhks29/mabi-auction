interface TotemAdditionalOptionType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}
export default function TotemAdditionalOption({ option, index, setSelectedItemOptions }: TotemAdditionalOptionType) {
  const handleTypeChange = (type: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: type,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type.includes(type));
      },
    });
  };

  const handleAdditionalOptionChange = (additionalOption: string) => {
    setSelectedItemOptions(index, {
      option_value: additionalOption,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) =>
            opt.option_sub_type.includes(option.option_sub_type) &&
            Number(opt.option_value) >= Number(additionalOption),
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">명칭</label>

        <input
          type="text"
          className="input w-full"
          placeholder="명칭"
          value={option.option_sub_type || ""}
          onChange={e => handleTypeChange(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <label className="label w-16">값</label>

        <input
          type="text"
          className="input w-full"
          placeholder="값"
          value={option.option_value || ""}
          onChange={e => handleAdditionalOptionChange(e.target.value)}
        />
      </div>
    </>
  );
}
