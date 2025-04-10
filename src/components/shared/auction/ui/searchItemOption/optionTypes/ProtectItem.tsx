import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProtectItem({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
      <Label>선택</Label>

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
          <SelectItem value="수리 실패">수리 실패</SelectItem>
          <SelectItem value="인챈트 실패">인챈트 실패</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
