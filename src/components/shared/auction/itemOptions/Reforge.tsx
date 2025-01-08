// TODO: refactor

import React from "react";

export default function Reforge({ reforgeOptions }: { reforgeOptions: ExtendedItemOptionTypes[] }) {
  const rank = reforgeOptions.find(option => option.option_type === "세공 랭크");
  const reforge_option = reforgeOptions.filter(option => option.option_type == "세공 옵션");

  return (
    reforgeOptions.some(reforge => reforge.isDisplay) && (
      <article className="option-box">
        <h3 className="option-title">세공</h3>
        {rank && (
          <p className={`text-[13px] font-bold ${rank?.option_value === "1" ? "text-pink-600" : "text-yellow-600"}`}>
            {rank?.option_value}랭크
          </p>
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
                <React.Fragment key={options.option_sub_type}>
                  <p className="font-semibold">{title}</p>
                  <p>({desc})</p>
                </React.Fragment>
              );
            }
          }
        })}
      </article>
    )
  );
}
