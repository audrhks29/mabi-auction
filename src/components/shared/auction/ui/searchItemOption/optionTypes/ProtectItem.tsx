export default function ProtectItem({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">선택</label>

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
        <option value="수리 실패">수리 실패</option>
        <option value="인챈트 실패">인챈트 실패</option>
      </select>
    </div>
  );
}
