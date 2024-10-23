import { Wrench } from "lucide-react";

export default function Developing() {
  return (
    <div className="flex justify-center items-center flex-col gap-3 h-56">
      <Wrench className="w-11 h-11" />
      <span>준비중인 기능입니다.</span>
    </div>
  );
}
