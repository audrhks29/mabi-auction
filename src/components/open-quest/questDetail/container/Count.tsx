import { Separator } from "@/components/ui/separator";
import { Heart, User } from "lucide-react";

export default function Count({ challenger_count, like_count }: { challenger_count: number; like_count: number }) {
  return (
    <div className="relative grid grid-cols-[1fr_1px_1fr] border-2 rounded-xl">
      <div className="p-3 flex gap-2 justify-center items-center">
        <User />
        <span>{challenger_count?.toLocaleString()}</span>
      </div>

      <Separator orientation="vertical" />

      <div className="p-3 flex gap-2 justify-center items-center">
        <Heart />
        <span>{like_count?.toLocaleString()}</span>
      </div>
    </div>
  );
}
