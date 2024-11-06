// TODO: refactor

export default function Erg({ ergOptions }: { ergOptions: ExtendedItemOptionTypes }) {
  return (
    ergOptions?.option_value && (
      <article className="option-box">
        <h3 className="option-title">에르그</h3>
        <p className="text-pink-600 text-[13px] font-bold">등급 {ergOptions?.option_sub_type}</p>
        <p>레벨 {ergOptions?.option_value}</p>
        <p>최대 레벨 {ergOptions?.option_value2}</p>
      </article>
    )
  );
}
