export default function Modification({ modificationOptions }: { modificationOptions: ExtendedItemOptionTypes[] }) {
  const general_modification = modificationOptions.find(option => option.option_type === "일반 개조");
  const gem_modification = modificationOptions.find(option => option.option_type === "보석 개조");
  const craftsman_modification = modificationOptions.find(option => option.option_type === "장인 개조");
  const special_modification = modificationOptions.find(option => option.option_type === "특별 개조");

  return (
    (general_modification?.option_value ||
      gem_modification?.option_value ||
      craftsman_modification?.option_value ||
      special_modification?.option_value) && (
      <div className="option-box">
        <h3 className="option-title">개조</h3>
        <div>
          {general_modification?.option_value && (
            <span>
              일반 개조 업그레이드 {general_modification?.option_value}/{general_modification?.option_value2}
            </span>
          )}
          {gem_modification?.option_value && <span>, 보석 업그레이드 {gem_modification?.option_value}</span>}
        </div>

        {Array.isArray(craftsman_modification?.option_value) && craftsman_modification?.option_value && (
          <p>장인 개조{craftsman_modification.option_value?.map(desc => <p key={desc}>{desc}</p>)}</p>
        )}

        {special_modification?.option_value && (
          <p>
            특별 개조 {special_modification?.option_sub_type} {special_modification?.option_value}단계
          </p>
        )}
      </div>
    )
  );
}
