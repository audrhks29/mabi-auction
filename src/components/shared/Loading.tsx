import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[150px]">
      <div>
        <LoaderCircle size={40} className="animate-spin" />
      </div>
      <div className="text-[12px] md:text-[14px]">데이터를 불러오는중입니다.</div>
    </div>
  );
}
