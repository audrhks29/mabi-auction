interface UnusableType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function Unusable({ option, index, setSelectedItemOptions }: UnusableType) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">여부</label>
      <select
        className="select w-full"
        onChange={e => {
          const selectedValue = e.target.value;

          setSelectedItemOptions(index, {
            option_value: selectedValue,
            calcFunc: item => {
              return item?.item_option?.some((opt: any) => {
                if (selectedValue === "false") {
                  return !(opt.option_type === option.option_type && opt.option_value === selectedValue);
                }

                return opt.option_type === option.option_type && opt.option_value === selectedValue;
              });
            },
          });
        }}>
        <option value="">없음</option>
        <option value="false">가능</option>
        <option value="true">불가능</option>
      </select>
    </div>
  );
}
