// TODO: refactor

import React from "react";

import convertOptionsArray from "@/utils/auction/convertOptionsArray";

import Attribute from "../itemDescription/Attribute";
import Enchant from "../itemDescription/Enchant";
import Modification from "../itemDescription/Modification";
import Erg from "../itemDescription/Erg";
import Reforge from "../itemDescription/Reforge";
import Set from "../itemDescription/Set";
import Color from "../itemDescription/Color";
import SeasoningEffect from "../itemDescription/SeasoningEffect";

export default function ItemDescription({ options }: { options: ItemOptionTypes[] }) {
  const optionsArray = convertOptionsArray(options);

  const attributeOptions = optionsArray.filter(option => option.type === "attribute");
  const enchantOptions = optionsArray.filter(option => option.type === "enchant");
  const modificationOptions = optionsArray.filter(option => option.type === "modification");
  const ergOptions = optionsArray.find(option => option.type === "erg");
  const reforgeOptions = optionsArray.filter(option => option.type === "reforge");
  const setOptions = optionsArray.filter(option => option.type === "set");
  const colorOptions = optionsArray.filter(option => option.type === "color");
  const seasoningOptions = optionsArray.find(option => option.type === "seasoningEffect");

  return (
    <div>
      <div className="font-bold text-center pt-3">
        <span>아이템 옵션</span>
      </div>

      <section className="text-[12px] max-h-[400px] pt-3 overflow-y-scroll">
        {/* 아이템 속성 */}
        <Attribute attributeOptions={attributeOptions} />

        {/* 인챈트 */}
        <Enchant enchantOptions={enchantOptions} />

        {/* 개조 */}
        <Modification modificationOptions={modificationOptions} />

        {/* 세공 */}
        {reforgeOptions && <Reforge reforgeOptions={reforgeOptions} />}

        {/* 에르그 */}
        {ergOptions && <Erg ergOptions={ergOptions} />}

        {/* 세트효과 */}
        <Set setOptions={setOptions} />

        {/* 색상 */}
        <Color colorOptions={colorOptions} />

        {/* 조미료 효과 */}
        {seasoningOptions?.isDisplay && <SeasoningEffect seasoningOptions={seasoningOptions} />}
      </section>
    </div>
  );
}
