export default function doesItemMatchAllConditions(item: any, conditions: OptionTypes[]): boolean {
  return conditions.every(condition =>
    item.item_option.some((opt: any) => opt.option_type === condition.option_type && matchCondition(opt, condition)),
  );
}

function matchCondition(opt: any, condition: OptionTypes) {
  const { option_type, option_value1, option_value2, isMore } = condition;

  switch (option_type) {
    case "공격":
    case "내구력":
    case "마법 방어력":
    case "마법 보호":
    case "방어력":
    case "보호":
    case "내구도":
    case "남은 거래 횟수":
    case "남은 사용 횟수":
    case "남은 전용 해제 가능 횟수":
    case "품질":
      return isMore
        ? Number(opt.option_value2) >= Number(option_value1)
        : Number(opt.option_value2) <= Number(option_value1);

    case "숙련":
      return isMore
        ? Number(opt.option_value) >= Number(option_value1)
        : Number(opt.option_value) <= Number(option_value1);

    case "크리티컬":
    case "밸런스":
      return isMore
        ? Number(opt.option_value?.replace("%", "") || 0) >= Number(option_value1)
        : Number(opt.option_value?.replace("%", "") || 0) <= Number(option_value1);

    case "크기":
      return isMore
        ? Number(opt.option_value?.replace("cm", "") || 0) >= Number(option_value1)
        : Number(opt.option_value?.replace("cm", "") || 0) <= Number(option_value1);

    case "세공 랭크":
      return opt.option_type === option_type && opt.option_value === option_value1;

    case "장인 개조":
    case "세공 옵션":
    case "세트 효과":
      // 문자열 포함 여부 (대소문자 무시)
      return String(opt.option_value).toLowerCase().includes(String(option_value1).toLowerCase());

    case "일반 개조":
    case "보석 개조":
    case "세공 랭크":
    case "피어싱 레벨":
      return Number(opt.option_value) === Number(option_value1);

    default:
      return false;
  }
}
