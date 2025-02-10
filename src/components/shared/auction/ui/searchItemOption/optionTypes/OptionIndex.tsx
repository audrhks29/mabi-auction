import Enchant from "./Enchant";
import MoreOrLess from "./MoreOrLess";
import ProtectItem from "./ProtectItem";
import ModificationItem from "./ModificationItem";
import Unusable from "./Unusable";
import ReforgeOption from "./ReforgeOption";
import ReforgeRank from "./ReforgeRank";
import SpecialModificationItem from "./SpecialModificationItem";
import Erg from "./Erg";
import EcoStoneRank from "./EcoStoneRank";
import EcoStoneUniqueAbility from "./EcoStoneUniqueAbility";
import EcoStoneAwakeningAbility from "./EcoStoneAwakeningAbility";
import TotemEffect from "./TotemEffect";
import TotemModificationLimit from "./TotemModificationLimit";
import TotemAdditionalOption from "./TotemAdditionalOption";
import PetInformation from "./PetInformation";

export default function OptionIndex({
  selectedOption,
  option,
  index,
  setSelectedItemOptions,
}: {
  selectedOption: { name: string; displayName?: string };
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}) {
  return (
    <>
      {(selectedOption.name === "공격" ||
        selectedOption.name === "크리티컬" ||
        selectedOption.name === "밸런스" ||
        selectedOption.name === "내구력" ||
        selectedOption.name === "숙련" ||
        selectedOption.name === "남은 전용 해제 가능 횟수" ||
        selectedOption.name === "마법 방어력" ||
        selectedOption.name === "마법 보호" ||
        selectedOption.name === "방어력" ||
        selectedOption.name === "보호" ||
        selectedOption.name === "내구도" ||
        selectedOption.name === "남은 거래 횟수" ||
        selectedOption.name === "남은 사용 횟수" ||
        selectedOption.name === "품질" ||
        selectedOption.name === "사용 효과" ||
        selectedOption.name === "조미료 효과" ||
        selectedOption.name === "크기" ||
        selectedOption.name === "색상") && (
        <MoreOrLess option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "세공 랭크" && (
        <ReforgeRank option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "세공 옵션" && (
        <ReforgeOption option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {(selectedOption.name === "인챈트" || selectedOption.name === "인챈트 종류") && (
        <Enchant option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {(selectedOption.name === "인챈트 불가능" || selectedOption.name === "전용 해제 거래 보증서 사용 불가") && (
        <Unusable option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "일반 개조" && (
        <ModificationItem option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "아이템 보호" && (
        <ProtectItem option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "특별 개조" && (
        <SpecialModificationItem option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {/* 세트효과 */}

      {selectedOption.name === "에르그" && (
        <Erg option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {/* 피어싱 */}

      {selectedOption.name === "에코스톤 등급" && (
        <EcoStoneRank option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "에코스톤 고유 능력" && (
        <EcoStoneUniqueAbility option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "에코스톤 각성 능력" && (
        <EcoStoneAwakeningAbility option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "토템 효과" && (
        <TotemEffect option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "토템 강화 제한" && (
        <TotemModificationLimit option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "토템 추가 옵션" && (
        <TotemAdditionalOption option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}

      {selectedOption.name === "펫 정보" && (
        <PetInformation option={option} index={index} setSelectedItemOptions={setSelectedItemOptions} />
      )}
    </>
  );
}
