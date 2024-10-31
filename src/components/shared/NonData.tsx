import { ServerCrash } from "lucide-react";

export default function NonData() {
  return (
    <div className="flex justify-center items-center flex-col gap-3 border min-h-[150px]">
      <ServerCrash className="w-11 h-11" />
      <span>검색된 결과가 없습니다.</span>
    </div>
  );
}
