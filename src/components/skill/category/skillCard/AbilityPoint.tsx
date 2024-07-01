export default function AbilityPoint({ needAp, accumulateAP }: { needAp: number; accumulateAP: number }) {
  return (
    <div className="border text-left text-[12px] p-3 rounded-sm">
      <h3 className="font-bold text-[14px] pb-3">AP</h3>

      <div className="grid grid-cols-[3fr_1fr]">
        <div className="flex">
          <p>*&nbsp;</p>
          <p>승급에 필요한 어빌리티 포인트</p>
        </div>
        <div className="flex justify-end">
          <p>{needAp} AP</p>
        </div>
      </div>

      <div className="grid grid-cols-[3fr_1fr]">
        <div className="flex">
          <p>*&nbsp;</p>
          <p>누적 어빌리티 포인트</p>
        </div>
        <div className="flex justify-end">
          <p>{accumulateAP} AP</p>
        </div>
      </div>
    </div>
  );
}
