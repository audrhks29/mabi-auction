interface MoreOrLessType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

// selectedOption.name === "사용 효과" ||
// selectedOption.name === "조미료 효과" ||
export default function MoreOrLess({ option, index, setSelectedItemOptions }: MoreOrLessType) {
  return (
    <div className="flex gap-3">
      <label className="label w-16">값</label>

      <input
        type="text"
        className="input w-full"
        placeholder="값"
        value={option.option_value || ""}
        onChange={e => {
          const inputValue = e.target.value;
          setSelectedItemOptions(index, {
            option_value: inputValue,
            calcFunc: item => {
              if (
                option.option_type === "공격" ||
                option.option_type === "내구력" ||
                option.option_type === "남은 전용 해제 가능 횟수" ||
                option.option_type === "마법 방어력" ||
                option.option_type === "마법 보호" ||
                option.option_type === "방어력" ||
                option.option_type === "보호" ||
                option.option_type === "내구도" ||
                option.option_type === "남은 거래 횟수" ||
                option.option_type === "남은 사용 횟수" ||
                option.option_type === "품질"
              ) {
                return item.item_option.some(
                  (opt: any) =>
                    opt.option_type === option.option_type && Number(opt.option_value2) >= Number(inputValue),
                );
              } else if (option.option_type === "숙련") {
                return item.item_option.some(
                  (opt: any) =>
                    opt.option_type === option.option_type && Number(opt.option_value) >= Number(inputValue),
                );
              } else if (option.option_type === "크리티컬" || option.option_type === "밸런스") {
                return item.item_option.some(
                  (opt: any) =>
                    opt.option_type === option.option_type &&
                    Number(opt.option_value?.replace("%", "") || 0) >= Number(inputValue),
                );
              }
            },
          });
        }}
      />
    </div>
  );
}
