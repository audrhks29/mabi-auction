export default function SeasoningEffect({ seasoningOptions }: { seasoningOptions: ExtendedItemOptionTypes }) {
  return (
    seasoningOptions && (
      <div className="option-box">
        <h3 className="option-title">조미료 효과</h3>
        <div>
          {Array.isArray(seasoningOptions?.option_value) &&
            seasoningOptions?.option_value?.map((value, index) => <p key={index}>{value}</p>)}
        </div>
      </div>
    )
  );
}
