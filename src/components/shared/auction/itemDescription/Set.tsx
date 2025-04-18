// TODO: refactor

import { Badge } from "@/components/ui/badge";

export default function Set({ setOptions }: { setOptions: ExtendedItemOptionTypes[] }) {
  return (
    setOptions.some(set => set.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            세트아이템
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          {setOptions.map(options => {
            if (options?.option_value !== undefined) {
              return (
                <li key={options?.id}>
                  {options?.option_value} {options?.option_value2} 증가
                </li>
              );
            }
          })}
        </ul>
      </fieldset>
    )
  );
}
