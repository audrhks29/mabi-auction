import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import talentLists from "@/assets/skill/talent.json";

import Image from "next/image";

export default function Talents() {
  return (
    <Card className="grid grid-cols-[400px_1fr]">
      <ScrollArea className="h-[600px]">
        <ul className="grid gap-1">
          {talentLists.map(talent => (
            <li key={talent.id} className="grid grid-cols-[50px_1fr] items-center gap-3 border h-16 text-[14px] p-3">
              <Image src={talent.image.fledgling} width={33} height={33} alt={talent.talent}></Image>
              <div>
                <p>{talent.talent}</p>
                <div className="bg-muted w-full h-4"></div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Card>
  );
}
