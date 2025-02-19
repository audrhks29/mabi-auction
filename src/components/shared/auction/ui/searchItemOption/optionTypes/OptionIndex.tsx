import MoreOrLess from "./MoreOrLess";
import ReforgeRank from "./ReforgeRank";
import ReforgeOption from "./ReforgeOption";
import Enchant from "./Enchant";
import Unusable from "./Unusable";
import ProtectItem from "./ProtectItem";
import ModificationItem from "./ModificationItem";
import SpecialModificationItem from "./SpecialModificationItem";
import SetEffect from "./SetEffect";
import Erg from "./Erg";
import Piercing from "./Piercing";
import EcoStoneRank from "./EcoStoneRank";
import EcoStoneUniqueAbility from "./EcoStoneUniqueAbility";
import EcoStoneAwakeningAbility from "./EcoStoneAwakeningAbility";
import TotemEffect from "./TotemEffect";
import TotemModificationLimit from "./TotemModificationLimit";
import TotemAdditionalOption from "./TotemAdditionalOption";
import PetInformation from "./PetInformation";

export default function OptionIndex({ currentOptionType, setValue, index }: SearchOptionPropsTypes) {
  const commonProps = { currentOptionType, index, setValue };
  return (
    <>
      {(currentOptionType === "공격" ||
        currentOptionType === "크리티컬" ||
        currentOptionType === "밸런스" ||
        currentOptionType === "내구력" ||
        currentOptionType === "숙련" ||
        currentOptionType === "남은 전용 해제 가능 횟수" ||
        currentOptionType === "마법 방어력" ||
        currentOptionType === "마법 보호" ||
        currentOptionType === "방어력" ||
        currentOptionType === "보호" ||
        currentOptionType === "내구도" ||
        currentOptionType === "남은 거래 횟수" ||
        currentOptionType === "남은 사용 횟수" ||
        currentOptionType === "품질" ||
        currentOptionType === "크기") && <MoreOrLess {...commonProps} />}

      {currentOptionType === "세공 랭크" && <ReforgeRank {...commonProps} />}

      {currentOptionType === "세공 옵션" && <ReforgeOption {...commonProps} />}

      {(currentOptionType === "인챈트" || currentOptionType === "인챈트 종류") && <Enchant {...commonProps} />}

      {(currentOptionType === "인챈트 불가능" || currentOptionType === "전용 해제 거래 보증서 사용 불가") && (
        <Unusable {...commonProps} />
      )}
      {currentOptionType === "일반 개조" && <ModificationItem {...commonProps} />}

      {currentOptionType === "아이템 보호" && <ProtectItem {...commonProps} />}

      {currentOptionType === "특별 개조" && <SpecialModificationItem {...commonProps} />}

      {currentOptionType === "세트 효과" && <SetEffect {...commonProps} />}

      {currentOptionType === "에르그" && <Erg {...commonProps} />}

      {currentOptionType === "피어싱 레벨" && <Piercing {...commonProps} />}

      {currentOptionType === "에코스톤 등급" && <EcoStoneRank {...commonProps} />}

      {currentOptionType === "에코스톤 고유 능력" && <EcoStoneUniqueAbility {...commonProps} />}

      {currentOptionType === "에코스톤 각성 능력" && <EcoStoneAwakeningAbility {...commonProps} />}

      {currentOptionType === "토템 효과" && <TotemEffect {...commonProps} />}

      {currentOptionType === "토템 강화 제한" && <TotemModificationLimit {...commonProps} />}

      {currentOptionType === "토템 추가 옵션" && <TotemAdditionalOption {...commonProps} />}

      {currentOptionType === "펫 정보" && <PetInformation {...commonProps} />}
    </>
  );
}
