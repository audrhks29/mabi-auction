// TODO: refactor

import { Badge } from "@/components/ui/badge";

export default function Erg({ ergOptions }: { ergOptions: ExtendedItemOptionTypes }) {
  return (
    ergOptions?.option_value && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            에르그
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          <li className="text-pink-600 text-[13px] font-bold">등급 {ergOptions?.option_sub_type}</li>
          <li>레벨 {ergOptions?.option_value}</li>
          <li>최대 레벨 {ergOptions?.option_value2}</li>
        </ul>
      </fieldset>
    )
  );
}
