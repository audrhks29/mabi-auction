interface ModificationItemType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function ModificationItem({ option, index, setSelectedItemOptions }: ModificationItemType) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">단계</label>
      <select
        className="select w-full"
        onChange={e => {
          const selectedValue = e.target.value;

          setSelectedItemOptions(index, {
            option_value: selectedValue,

            calcFunc: item => {
              return item?.item_option?.some(
                (opt: any) => opt.option_type === option.option_type && opt.option_value === selectedValue,
              );
            },
          });
        }}>
        <option value="">없음</option>
        <option value="1">업그레이드 1단계</option>
        <option value="2">업그레이드 2단계</option>
        <option value="3">업그레이드 3단계</option>
        <option value="4">업그레이드 4단계</option>
        <option value="5">업그레이드 5단계</option>
      </select>
    </div>
  );
}
