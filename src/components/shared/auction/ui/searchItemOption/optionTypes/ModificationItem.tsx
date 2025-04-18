import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ModificationItem({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
      <Label>단계</Label>

      <Select
        onValueChange={value => {
          setValue(`options.${index}.calcFunc`, (item: any) => {
            return item?.item_option?.some(
              (opt: any) => opt.option_type === currentOptionType && opt.option_value === value,
            );
          });
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="없음" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="1">업그레이드 1단계</SelectItem>
          <SelectItem value="2">업그레이드 2단계</SelectItem>
          <SelectItem value="3">업그레이드 3단계</SelectItem>
          <SelectItem value="4">업그레이드 4단계</SelectItem>
          <SelectItem value="5">업그레이드 5단계</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
