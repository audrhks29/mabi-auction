interface OptionTypes {
  option_type?: string | null;
  calcFunc?: (item: any) => boolean | undefined;
}

interface SearchOptionFormTypes {
  options: OptionTypes[];
}

interface SearchOptionPropsTypes {
  currentOptionType: string;
  setValue: UseFormSetValue<SearchOptionFormTypes>;
  index: number;
}
