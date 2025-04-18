// TODO: refactor

import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";

export default function Color({ colorOptions }: { colorOptions: ExtendedItemOptionTypes[] }) {
  return (
    colorOptions.some(color => color.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            아이템 색상
          </Badge>
        </legend>

        <ul className="grid grid-cols-2 gap-1 py-1 px-3 text-card-foreground/90">
          {colorOptions.map(option => {
            if (option?.option_value !== undefined || option?.option_desc !== undefined) {
              const [r, g, b] =
                option?.option_value && !Array.isArray(option?.option_value)
                  ? option?.option_value?.split(",").map(Number)
                  : [];
              const backgroundColor = `rgb(${r},${g},${b})`;

              return (
                <li key={option?.id}>
                  <p className="font-bold">{option?.option_sub_type}</p>
                  <div className="flex gap-1">
                    {/* 빤짝이는 색상 - option_value기 null이면 빤짝이*/}
                    {option?.option_value === null ? (
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 border bg-card border-primary"></div>
                        <span>{option?.option_value || option?.option_desc}</span>
                      </div>
                    ) : (
                      // rgb 색상
                      <div className="flex items-center gap-1">
                        <div style={{ backgroundColor }} className="w-4 h-4 border"></div>

                        {!Array.isArray(option?.option_value) &&
                          option?.option_value?.split(",").map((rgbColor, index: number) => (
                            <span key={uuidv4()}>
                              {index === 0 ? "R:" : index === 1 ? "G:" : "B:"}
                              {rgbColor}
                              {index === 2 ? "" : ","}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </fieldset>
    )
  );
}
