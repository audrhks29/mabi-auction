// TODO: refactor

import { Badge } from "@/components/ui/badge";

export default function Reforge({ reforgeOptions }: { reforgeOptions: ExtendedItemOptionTypes[] }) {
  const rank = reforgeOptions.find(option => option.option_type === "세공 랭크");
  const reforge_option = reforgeOptions.filter(option => option.option_type == "세공 옵션");

  return (
    reforgeOptions.some(reforge => reforge.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            세공
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          {rank && (
            <li className={`text-[13px] font-bold ${rank?.option_value === "1" ? "text-pink-600" : "text-yellow-600"}`}>
              {rank?.option_value}랭크
            </li>
          )}
          {reforge_option?.map(options => {
            if (options?.option_value === undefined) {
              return;
            }

            if (typeof options?.option_value === "string") {
              const match = options?.option_value.match(/(.*)\((.*)\)/);

              if (match) {
                const title = match[1].trim();
                const desc = match[2];
                return (
                  <li key={options.option_sub_type}>
                    <p className="font-semibold">{title}</p>
                    <p>({desc})</p>
                  </li>
                );
              } else {
                return <li key={options.option_value}>{options.option_value}</li>;
              }
            }
          })}
        </ul>
      </fieldset>
    )
  );
}
