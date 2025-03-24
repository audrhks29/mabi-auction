export default function Mission({ mission }: { mission: MissionTypes[] }) {
  return (
    <article>
      <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">미션</h4>

      <div className="divider m-0 p-0 before:bg-primary after:bg-primary"></div>

      <ul className="text-[14px] md:text-[16px] flex flex-col gap-3">
        {mission ? (
          mission?.map((item, index) => (
            <li key={index} className="p-3 border rounded-lg border-neutral-content dark:border-opacity-50">
              <span className="badge bg-neutral text-neutral-content rounded-md p-4 mr-3 font-bold">
                MISSION {index + 1}
              </span>
              <span>{item.description}</span>
            </li>
          ))
        ) : (
          <li className="p-3 border rounded-lg border-neutral-content dark:border-opacity-50">
            <span className="badge bg-neutral text-neutral-content rounded-md p-4 mr-3 font-bold">MISSION 1</span>
            <span className="skeleton text-base-300 text-opacity-0">미션 내용을 설명하는 스켈레톤 구역입니다.</span>
          </li>
        )}
      </ul>
    </article>
  );
}
