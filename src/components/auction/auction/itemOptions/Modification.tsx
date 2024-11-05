export default function Modification({ modificationOptions }: { modificationOptions: ExtendedItemOptionTypes[] }) {
  const general_modification = modificationOptions.find(option => option.option_type === "일반 개조");
  const gem_modification = modificationOptions.find(option => option.option_type === "보석 개조");
  const craftsman_modification = modificationOptions.find(option => option.option_type === "장인 개조");
  const special_modification = modificationOptions.find(option => option.option_type === "특별 개조");

  return (
    modificationOptions.some(modi => modi.isDisplay) && (
      <article className="option-box">
        <h3 className="option-title">개조</h3>
        <div>
          {general_modification?.option_value && (
            <>
              <b>일반 개조&nbsp;</b>
              <span>
                업그레이드 {general_modification?.option_value}/{general_modification?.option_value2}
              </span>
            </>
          )}
          {gem_modification?.option_value && <span>, 보석 업그레이드 {gem_modification?.option_value}</span>}
        </div>

        {Array.isArray(craftsman_modification?.option_value) && craftsman_modification?.option_value && (
          <>
            <b>장인 개조</b>
            <p>{craftsman_modification.option_value?.map(desc => <p key={desc}>{desc}</p>)}</p>
          </>
        )}

        {special_modification?.option_value && (
          <>
            <b>특별 개조&nbsp;</b>
            <span className="text-orange-600 font-extrabold">
              {special_modification?.option_sub_type} {special_modification?.option_value}
            </span>
            <span>단계</span>
          </>
        )}
      </article>
    )
  );
}
