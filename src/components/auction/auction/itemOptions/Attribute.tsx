export default function Attribute({ attributeOptions }: { attributeOptions: ExtendedItemOptionTypes[] }) {
  // 아이템 속성
  const attack = attributeOptions.find(option => option.option_type === "공격");
  const injury_rate = attributeOptions.find(option => option.option_type === "부상률");
  const critical = attributeOptions.find(option => option.option_type === "크리티컬");
  const balance = attributeOptions.find(option => option.option_type === "밸런스");
  const durability = attributeOptions.find(option => option.option_type === "내구력");
  const proficiency = attributeOptions.find(option => option.option_type === "숙련");
  const defensive = attributeOptions.find(option => option.option_type === "방어력");
  const safety = attributeOptions.find(option => option.option_type === "보호");
  const magicalDefensive = attributeOptions.find(option => option.option_type === "마법 방어력");
  const magicalSafety = attributeOptions.find(option => option.option_type === "마법 보호");

  return (
    attributeOptions.some(option => option.isDisplay) && (
      <div className="option-box">
        <h3 className="option-title">아이템 속성</h3>
        <div>
          {attack?.isDisplay && (
            <p>
              <b>공격</b> {attack?.option_value} ~ {attack?.option_value2}
            </p>
          )}
          {injury_rate?.isDisplay && (
            <p>
              <b>부상률</b> {injury_rate?.option_value} ~ {injury_rate?.option_value2}
            </p>
          )}
          {critical?.isDisplay && (
            <p>
              <b>크리티컬</b> {critical?.option_value}
            </p>
          )}
          {balance?.isDisplay && (
            <p>
              <b>밸런스</b> {balance?.option_value}
            </p>
          )}
          {defensive?.isDisplay && (
            <p>
              <b>방어</b> {defensive?.option_value}
            </p>
          )}
          {safety?.isDisplay && (
            <p>
              <b>보호</b> {safety?.option_value}
            </p>
          )}
          {magicalDefensive?.isDisplay && (
            <p>
              <b>마법 방어력</b> {magicalDefensive?.option_value}
            </p>
          )}
          {magicalSafety?.isDisplay && (
            <p>
              <b>마법 보호</b> {magicalSafety?.option_value}
            </p>
          )}
          {durability?.isDisplay && (
            <p>
              <b>내구력</b> {durability?.option_value}/{durability?.option_value2}
            </p>
          )}
          {proficiency?.isDisplay && (
            <p>
              <b>숙련</b> {proficiency?.option_value}
            </p>
          )}
        </div>
      </div>
    )
  );
}
