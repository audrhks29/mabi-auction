interface ProtectItemType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function ProtectItem({ option, index, setSelectedItemOptions }: ProtectItemType) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">선택</label>

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
        <option value="수리 실패">수리 실패</option>
        <option value="인챈트 실패">인챈트 실패</option>
      </select>
    </div>
  );
}
