export default function Stats({
  bonusStats,
  accumulateStats,
}: {
  bonusStats: StatsTypes | null;
  accumulateStats: StatsTypes | null;
}) {
  const bonusStatsArray = bonusStats && [...Object.keys(bonusStats), ...Object.values(bonusStats)];
  const accumulateStatsArray = accumulateStats && [...Object.keys(accumulateStats), ...Object.values(accumulateStats)];

  return (
    <div className=" text-left text-[12px] grid grid-cols-2 gap-3">
      <div className="border p-3 rounded-sm">
        <h3 className="font-bold text-[14px] pb-3">승급 시 받는 스탯</h3>

        <div className="grid grid-cols-2">
          {bonusStatsArray?.map((item, index) => {
            if (typeof item === "string") return <p key={index}>* {item}</p>;
            else if (typeof item === "number") {
              return (
                <p key={index} className="flex justify-end">
                  +{item}
                </p>
              );
            }
          })}
        </div>
      </div>

      {/* --- 누적 스탯 --- */}
      <div className="border p-3 rounded-sm">
        <h3 className="font-bold text-[14px] pb-3">누적 스탯</h3>

        <div className="grid grid-cols-2">
          {accumulateStatsArray?.map((stat, index) => {
            if (typeof stat === "string") {
              return <p key={index}>* {stat}</p>;
            } else if (typeof stat === "number") {
              return (
                <p key={index} className="flex justify-end">
                  + {stat}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
