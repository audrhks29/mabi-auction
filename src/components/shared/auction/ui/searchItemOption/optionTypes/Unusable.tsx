import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Unusable({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
      <Label>여부</Label>

      <Select
        onValueChange={value => {
          setValue(`options.${index}.calcFunc`, (item: any) => {
            return item?.item_option?.some((opt: any) => {
              if (value === "false") {
                return !(opt.option_type === currentOptionType && opt.option_value === value);
              }

              return opt.option_type === currentOptionType && opt.option_value === value;
            });
          });
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="없음" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="false">가능</SelectItem>
          <SelectItem value="true">불가능</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
