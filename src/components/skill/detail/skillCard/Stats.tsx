export default function Stats({
  bonusStats,
  accumulateStats,
}: {
  bonusStats: StatsTypes | null;
  accumulateStats: StatsTypes | null;
}) {
  const bonusStatsArray = bonusStats && Object.entries(bonusStats);
  const accumulateStatsArray = accumulateStats && Object.entries(accumulateStats);

  return (
    <div className=" text-left text-[12px] grid grid-cols-2 gap-3">
      <div className="border p-3 rounded-sm">
        <h3 className="font-bold text-[14px] pb-3">승급 시 받는 스탯</h3>

        {bonusStatsArray?.map((stat, index) => {
          return (
            <div key={index} className="flex justify-between">
              <p>* {stat[0]}</p>
              <p>+ {stat[1]}</p>
            </div>
          );
        })}
      </div>

      {/* --- 누적 스탯 --- */}
      <div className="border p-3 rounded-sm">
        <h3 className="font-bold text-[14px] pb-3">누적 스탯</h3>

        {accumulateStatsArray?.map((stat, index) => {
          return (
            <div key={index} className="flex justify-between">
              <p>* {stat[0]}</p>
              <p>+ {stat[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
