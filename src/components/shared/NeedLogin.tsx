import { Info } from "lucide-react";

export default function NeedLogin() {
  return (
    <div className="flex justify-center items-center flex-col gap-3 h-56 border border-base-200">
      <Info className="w-11 h-11" />
      <span>로그인이 필요합니다.</span>
    </div>
  );
}
