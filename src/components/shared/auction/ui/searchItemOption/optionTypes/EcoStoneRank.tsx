interface EcoStoneRankType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function EcoStoneRank({ option, index, setSelectedItemOptions }: EcoStoneRankType) {
  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex gap-3">
      <label className="label w-16">등급</label>

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
        {numbers.map(num => (
          <option key={num} value={num}>
            {num}등급
          </option>
        ))}
      </select>
    </div>
  );
}
