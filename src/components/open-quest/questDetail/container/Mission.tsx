import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Mission({ mission }: { mission: MissionTypes[] }) {
  return (
    <article>
      <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">미션</h4>

      <Separator className="mb-3" />

      <ul className="text-[14px] md:text-[16px] flex flex-col gap-3">
        {mission?.map((item, index) => (
          <li key={index} className="p-3 bg-card border rounded-xl flex gap-2 items-center">
            <Badge className="font-bold">MISSION {index + 1}</Badge>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
