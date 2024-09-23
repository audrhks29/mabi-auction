import { ScrollArea } from "@/components/ui/scroll-area";
import talentLists from "@/assets/skill/talent.json";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function Talents({
  selectedTalent,
  setSelectedTalent,
}: {
  selectedTalent: string;
  setSelectedTalent: Dispatch<SetStateAction<string>>;
}) {
  return (
    <ScrollArea className="h-[600px] p-3">
      <ul className="grid gap-1">
        {talentLists.map(talent => (
          <li
            key={talent.id}
            className="grid grid-cols-[50px_1fr] items-center gap-3 border h-16 text-[14px] p-3 hover:cursor-pointer"
            onClick={() => setSelectedTalent(talent.talent)}>
            <Image src={talent.image.bronze} width={33} height={33} alt={talent.talent}></Image>

            <div>
              <p>{talent.talent}</p>
              <div className="bg-muted w-full h-4"></div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
