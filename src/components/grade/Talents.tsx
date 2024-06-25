import { ScrollArea } from "@/components/ui/scroll-area";
import talentLists from "@/assets/skill/talent.json";

export default function Talents() {
  return (
    <ScrollArea className="h-[200px]">
      <ul>
        {talentLists.map(talent => (
          <li key={talent.id}>{talent.talent}</li>
        ))}
      </ul>
    </ScrollArea>
  );
}
