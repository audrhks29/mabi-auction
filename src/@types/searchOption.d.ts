interface OptionTypes {
  option_type?: string | null;
  option_sub_type?: string | null;
  option_value?: string | null;
  option_value2?: string | null;
  calcFunc?: (item: any) => boolean | undefined;
}
