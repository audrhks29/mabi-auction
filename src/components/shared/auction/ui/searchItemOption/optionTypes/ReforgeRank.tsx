interface ReforgeRankType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function ReforgeRank({ option, index, setSelectedItemOptions }: ReforgeRankType) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">랭크</label>

      <select
        className="select w-full"
        onChange={e =>
          setSelectedItemOptions(index, {
            option_value: e.target.value,
            calcFunc: item => {
              const inputValue = e.target.value;
              return item.item_option.some(
                (opt: any) => opt.option_type === option.option_type && opt.option_value === inputValue,
              );
            },
          })
        }>
        <option value="">없음</option>
        <option value="3">3 랭크</option>
        <option value="2">2 랭크</option>
        <option value="1">1 랭크</option>
      </select>
    </div>
  );
}
