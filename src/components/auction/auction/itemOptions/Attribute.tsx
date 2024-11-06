// TODO: refactor

export default function Attribute({ attributeOptions }: { attributeOptions: ExtendedItemOptionTypes[] }) {
  // 아이템 속성
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

  return (
    attributeOptions.some(option => option.isDisplay) && (
      <article className="option-box mt-3">
        <h3 className="option-title">아이템 속성</h3>

        <ul>
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
        </ul>
      </article>
    )
  );
}
