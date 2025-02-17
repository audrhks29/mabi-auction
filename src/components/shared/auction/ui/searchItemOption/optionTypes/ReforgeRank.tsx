export default function ReforgeRank({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">랭크</label>

      <select
        className="select w-full"
        defaultValue=""
        onChange={e => {
          const selectedValue = e.target.value;

          setValue(`options.${index}.calcFunc`, (item: any) => {
            return item.item_option.some(
              (opt: any) => opt.option_type === currentOptionType && opt.option_value === selectedValue,
            );
          });
        }}>
        <option value="">없음</option>
        <option value="3">3 랭크</option>
        <option value="2">2 랭크</option>
        <option value="1">1 랭크</option>
      </select>
    </div>
  );
}
