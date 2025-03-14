import { ServerCrash } from "lucide-react";

export default function NonData() {
  return (
    <div className="flex justify-center items-center flex-col gap-3 border border-base-200 min-h-[150px]">
      <ServerCrash className="w-11 h-11" />
      <span className="text-[12px] md:text-[14px]">검색된 결과가 없습니다.</span>
    </div>
  );
}
