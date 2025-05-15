interface OptionTypes {
  /**
   * 옵션 타입 - 예) 공격, 크리티컬
   */
  option_type?: string | null;
  /**
   * 계산 함수
   */
  calcFunc?: (item: any) => boolean | undefined;
  option_value1?: string | null;
  option_value2?: any | string | null;
  /**
   * 이상 이하 값
   */
  isMore?: boolean | null;
}

interface SearchOptionFormTypes {
  options: OptionTypes[];
}

interface SearchOptionPropsTypes {
  watch: UseFormWatch<SearchOptionFormTypes>;
  currentOptionType: string;
  setValue: UseFormSetValue<SearchOptionFormTypes>;
  index: number;
}
