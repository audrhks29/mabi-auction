// TODO: refactor

import React from "react";

import { Badge } from "@/components/ui/badge";

export default function Modification({ modificationOptions }: { modificationOptions: ExtendedItemOptionTypes[] }) {
  const general_modification = modificationOptions.find(option => option.option_type === "일반 개조");
  const gem_modification = modificationOptions.find(option => option.option_type === "보석 개조");
  const craftsman_modification = modificationOptions.find(option => option.option_type === "장인 개조");
  const special_modification = modificationOptions.find(option => option.option_type === "특별 개조");

  return (
    modificationOptions.some(modi => modi.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            개조
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          <li>
            {general_modification?.option_value && (
              <React.Fragment>
                <b>일반 개조&nbsp;</b>
                <span>
                  업그레이드 {general_modification?.option_value}/{general_modification?.option_value2}
                </span>
              </React.Fragment>
            )}
            {gem_modification?.option_value && <span>, 보석 업그레이드 {gem_modification?.option_value}</span>}
          </li>

          {Array.isArray(craftsman_modification?.option_value) && craftsman_modification?.option_value && (
            <li>
              <b>장인 개조</b>
              <div>{craftsman_modification.option_value?.map(desc => <p key={desc}>{desc}</p>)}</div>
            </li>
          )}

          {special_modification?.option_value && (
            <li>
              <b>특별 개조&nbsp;</b>
              <span className="text-orange-600 font-extrabold">
                {special_modification?.option_sub_type} {special_modification?.option_value}
              </span>
              <span>단계</span>
            </li>
          )}
        </ul>
      </fieldset>
    )
  );
}
