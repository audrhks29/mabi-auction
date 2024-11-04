import convertOptionsArray from "@/utils/auction/convertOptionsArray";
import React from "react";
import Attribute from "./itemOptions/Attribute";
import Enchant from "./itemOptions/Enchant";
import Modification from "./itemOptions/Modification";
import Erg from "./itemOptions/Erg";

export default function ItemOptions({ options }: { options: ItemOptionTypes[] }) {
  console.log(options);
  const optionsArray = convertOptionsArray(options);

  const attributeOptions = optionsArray.filter(option => option.type === "attribute");
  const enchantOptions = optionsArray.filter(option => option.type === "enchant");
  const modificationOptions = optionsArray.filter(option => option.type === "modification");
  const ergOptions = optionsArray.find(option => option.type === "erg");

  // 아이템이 인챈트 아이템인지 장비 아이템인지 구별
  const isEnchant = options.some(option => option.option_type === "인챈트 종류");

  const enchant_head = options.find(option => option?.option_sub_type === "접두");
  const enchant_tail = options.find(option => option?.option_sub_type === "접미");

  const general_modification = options.find(option => option.option_type === "일반 개조");
  const gem_modification = options.find(option => option.option_type === "보석 개조");
  const special_modification = options.find(option => option.option_type === "특별 개조");

  const reforge_rank = options.find(option => option.option_type === "세공 랭크");
  const reforge_option = options.filter(option => option.option_type === "세공 옵션");

  const erg = options.find(option => option.option_type === "에르그");

  const set_effect = options.filter(option => option.option_type === "세트 효과");
  // console.log(convertOptionsArray(options));
  return (
    <div>
      <div className="font-bold text-center p-3">
        <span>아이템 옵션</span>
      </div>
      {/* 아이템 속성 */}
      <div className="text-[12px]">
        <Attribute attributeOptions={attributeOptions} />
        {/* 인챈트 */}
        <Enchant enchantOptions={enchantOptions} />

        {/* 개조 */}
        <Modification modificationOptions={modificationOptions} />

        {/* 세공 */}
        {/* <div>
        <p>세공</p>
        <p>{reforge_rank?.option_value}랭크</p>
        {reforge_option.map(options => {
          const match = options.option_value.match(/(.*)\((.*)\)/)!;

          const title = match[1].trim();
          const desc = match[2];
          return (
            <React.Fragment key={options.option_sub_type}>
              <p>{title}</p>
              <p>{desc}</p>
            </React.Fragment>
          );
        })}
      </div> */}

        {/* 에르그 */}
        {ergOptions && <Erg ergOptions={ergOptions} />}

        {/* 세트효과 */}
        {/* {reforge_option.map(options => {
        const match = options.option_value.match(/(.*)\((.*)\)/)!;

        const title = match[1].trim();
        const desc = match[2];
        return (
          <React.Fragment key={options.option_sub_type}>
            <p>{title}</p>
            <p>{desc}</p>
          </React.Fragment>
        );
      })} */}
        {/* 색상 */}
      </div>
    </div>
  );
}
