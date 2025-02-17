export default function Unusable({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">여부</label>

      <select
        className="select w-full"
        onChange={e => {
          const selectedValue = e.target.value;

          setValue(`options.${index}.calcFunc`, (item: any) => {
            return item?.item_option?.some((opt: any) => {
              if (selectedValue === "false") {
                return !(opt.option_type === currentOptionType && opt.option_value === selectedValue);
              }

              return opt.option_type === currentOptionType && opt.option_value === selectedValue;
            });
          });
        }}
        required>
        <option value="">없음</option>
        <option value="false">가능</option>
        <option value="true">불가능</option>
      </select>
    </div>
  );
}
