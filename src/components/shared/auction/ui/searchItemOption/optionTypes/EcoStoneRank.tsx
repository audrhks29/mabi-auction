export default function EcoStoneRank({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex gap-3">
      <label className="label w-16">등급</label>

      <select
        className="select w-full"
        onChange={e => {
          const selectedValue = e.target.value;

          setValue(`options.${index}.calcFunc`, (item: any) => {
            return item?.item_option?.some(
              (opt: any) => opt.option_type === currentOptionType && opt.option_value === selectedValue,
            );
          });
        }}
        required>
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
