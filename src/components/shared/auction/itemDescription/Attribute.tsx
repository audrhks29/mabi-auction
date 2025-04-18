// TODO: refactor

import React from "react";

import { Badge } from "@/components/ui/badge";

export default function Attribute({ attributeOptions }: { attributeOptions: ExtendedItemOptionTypes[] }) {
  // 아이템 속성
  const ecoStoneTier = attributeOptions.find(option => option.option_type === "에코스톤 등급");
  const ecoStoneAbility = attributeOptions.find(option => option.option_type === "에코스톤 고유 능력");
  const ecoStoneArousalAbility = attributeOptions.find(option => option.option_type === "에코스톤 각성 능력");
  const attack = attributeOptions.find(option => option.option_type === "공격");
  const injury_rate = attributeOptions.find(option => option.option_type === "부상률");
  const critical = attributeOptions.find(option => option.option_type === "크리티컬");
  const balance = attributeOptions.find(option => option.option_type === "밸런스");
  const durability = attributeOptions.find(option => option.option_type === "내구력");
  const repairProtect = attributeOptions.find(option => option.option_value === "수리 실패");
  const enchantProtect = attributeOptions.find(option => option.option_value === "인챈트 실패");
  const unlock = attributeOptions.find(option => option.option_type === "남은 전용 해제 가능 횟수");
  const proficiency = attributeOptions.find(option => option.option_type === "숙련");
  const defensive = attributeOptions.find(option => option.option_type === "방어력");
  const safety = attributeOptions.find(option => option.option_type === "보호");
  const magicalDefensive = attributeOptions.find(option => option.option_type === "마법 방어력");
  const magicalSafety = attributeOptions.find(option => option.option_type === "마법 보호");
  const piercing = attributeOptions.find(option => option.option_type === "피어싱 레벨");
  const enchantDurability = attributeOptions?.find(option => option.option_type === "내구도");
  const kindOfEnchant = attributeOptions?.find(option => option.option_type === "인챈트 종류");
  const transactionsRemaining = attributeOptions?.find(option => option.option_type === "남은 거래 횟수");
  const quality = attributeOptions?.find(option => option.option_type === "품질");
  const effectOfIntake = attributeOptions?.find(option => option.option_type === "사용 효과");
  const size = attributeOptions?.find(option => option.option_type === "크기");
  const dyeingColor = attributeOptions?.find(option => option.option_type === "색상");
  const totemEffect = attributeOptions?.find(option => option.option_type === "토템 효과");
  const totemAdditional = attributeOptions?.find(option => option.option_type === "토템 추가 옵션");
  const totemLimits = attributeOptions?.find(option => option.option_type === "토템 강화 제한");
  const petInfo = attributeOptions?.find(option => option.option_type === "펫 정보");
  console.log(petInfo);
  return (
    attributeOptions.some(option => option.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            아이템 속성
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          {ecoStoneTier?.isDisplay && (
            <li className="text-yellow-600 text-[13px]">
              <b>{ecoStoneTier?.option_value}등급</b>
            </li>
          )}

          {ecoStoneAbility?.isDisplay && (
            <li>
              <b>고유 능력</b>
              <p>
                {ecoStoneAbility?.option_sub_type} {ecoStoneAbility?.option_value} 증가
              </p>
            </li>
          )}

          {ecoStoneArousalAbility?.isDisplay && (
            <li>
              <b>각성 능력</b>
              <p>{ecoStoneArousalAbility?.option_value}</p>
            </li>
          )}

          {attack?.isDisplay && (
            <li>
              <b>공격&nbsp;</b>
              <span>
                {attack?.option_value} ~ {attack?.option_value2}
              </span>
            </li>
          )}

          {injury_rate?.isDisplay && (
            <li>
              <b>부상률&nbsp;</b>
              <span>
                {injury_rate?.option_value} ~ {injury_rate?.option_value2}
              </span>
            </li>
          )}

          {critical?.isDisplay && (
            <li>
              <b>크리티컬&nbsp;</b>
              <span>{critical?.option_value}</span>
            </li>
          )}

          {balance?.isDisplay && (
            <li>
              <b>밸런스&nbsp;</b>
              <span>{balance?.option_value}</span>
            </li>
          )}

          {defensive?.isDisplay && (
            <li>
              <b>방어&nbsp;</b>
              <span>{defensive?.option_value}</span>
            </li>
          )}

          {safety?.isDisplay && (
            <li>
              <b>보호&nbsp;</b>
              <span>{safety?.option_value}</span>
            </li>
          )}

          {magicalDefensive?.isDisplay && (
            <li>
              <b>마법 방어력&nbsp;</b>
              <span>{magicalDefensive?.option_value}</span>
            </li>
          )}

          {magicalSafety?.isDisplay && (
            <li>
              <b>마법 보호&nbsp;</b>
              <span>{magicalSafety?.option_value}</span>
            </li>
          )}

          {durability?.isDisplay && (
            <li>
              <b>내구력&nbsp;</b>
              <span>
                {durability?.option_value}/{durability?.option_value2}
              </span>
            </li>
          )}

          {proficiency?.isDisplay && (
            <li>
              <b>숙련&nbsp;</b>
              <span>{proficiency?.option_value}</span>
            </li>
          )}

          {repairProtect?.isDisplay && (
            <li>
              <span>(수리 실패시 아이템 보호)</span>
            </li>
          )}

          {enchantProtect?.isDisplay && (
            <li>
              <span>(인챈트 실패 시 아이템 보호)</span>
            </li>
          )}

          {unlock?.isDisplay && (
            <li>
              <b>남은 전용 해제 가능 횟수&nbsp;</b>
              <span>{unlock?.option_value}</span>
            </li>
          )}

          {piercing?.isDisplay && (
            <li>
              <b>피어싱 레벨&nbsp;</b>
              <span>{piercing?.option_value}</span>
              {piercing?.option_value2 && <span className="text-orange-400">{piercing?.option_value2}</span>}
            </li>
          )}

          {enchantDurability?.isDisplay && (
            <li>
              <b>내구도&nbsp;</b>
              <span>{enchantDurability?.option_value}</span>
            </li>
          )}

          {kindOfEnchant?.isDisplay && (
            <li>
              <b>{kindOfEnchant.option_sub_type}&nbsp;</b>
              <span>{kindOfEnchant.option_value}</span>
            </li>
          )}

          {effectOfIntake?.isDisplay && Array.isArray(effectOfIntake?.option_value) && (
            <li>{effectOfIntake?.option_value?.map((value, index) => <p key={index}>{value}</p>)}</li>
          )}

          {quality?.isDisplay && (
            <li>
              <b>품질&nbsp;:&nbsp;</b>
              {Array.from({ length: Number(quality.option_value) }, (_, i) => (
                <span key={i}>★</span>
              ))}
            </li>
          )}

          {dyeingColor?.isDisplay && Array.isArray(dyeingColor?.option_value) && (
            <React.Fragment>
              <li className="uppercase">{`#${dyeingColor.option_value
                .map(value => {
                  const hex = parseInt(value, 10).toString(16).padStart(2, "0");
                  return hex;
                })
                .join("")}`}</li>
              <li>
                {dyeingColor?.option_value.map((rgbColor, index) => (
                  <span key={index}>
                    {index === 0 ? "R:" : index === 1 ? "G:" : "B:"}
                    {rgbColor}&nbsp;
                  </span>
                ))}
              </li>
            </React.Fragment>
          )}

          {totemEffect?.isDisplay &&
            Array.isArray(totemEffect?.option_value) &&
            totemEffect.option_value?.map((item, index) => (
              <li key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <span key={key}>
                    <b>{key}</b>: {value}
                  </span>
                ))}
              </li>
            ))}

          {totemAdditional?.isDisplay && (
            <li className="text-blue-600">
              <b>추가 옵션&nbsp;:&nbsp;</b>
              <span>
                {totemAdditional?.option_sub_type} +{totemAdditional?.option_value}
              </span>
            </li>
          )}

          {totemLimits?.isDisplay &&
            Array.isArray(totemLimits?.option_value) &&
            totemLimits.option_value?.map((item, index) => (
              <li key={index} className="text-yellow-600">
                {Object.entries(item).map(([key, value]) => (
                  <span key={key}>
                    <b>{key}</b>: {value}
                  </span>
                ))}
              </li>
            ))}

          {petInfo?.isDisplay &&
            Array.isArray(petInfo?.option_value) &&
            petInfo.option_value?.map((item, index) => (
              <li key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <span key={key}>
                    <b>{key}</b>: {value}
                  </span>
                ))}
              </li>
            ))}

          {transactionsRemaining?.isDisplay && (
            <li>
              <b>거래 가능 횟수&nbsp;</b>
              <span>{transactionsRemaining?.option_value}</span>
            </li>
          )}

          {size?.isDisplay && (
            <li>
              <b>크기&nbsp;:&nbsp;</b>
              <span>{size?.option_value}</span>
            </li>
          )}
        </ul>
      </fieldset>
    )
  );
}
