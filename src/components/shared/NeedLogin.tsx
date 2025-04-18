import { Info } from "lucide-react";

export default function NeedLogin() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[150px]">
      <div>
        <Info className="w-11 h-11" />
      </div>
      <div className="text-[12px] md:text-[14px]"> 로그인이 필요합니다.</div>
    </div>
  );
}
