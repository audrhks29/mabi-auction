import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EcoStoneRank({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
      <Label>등급</Label>

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
          {numbers.map(num => (
            <SelectItem key={num} value={String(num)}>
              {num}등급
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
