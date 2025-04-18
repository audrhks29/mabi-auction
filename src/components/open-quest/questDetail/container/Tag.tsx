import { Badge } from "@/components/ui/badge";

export default function Tag({ tag }: { tag: string }) {
  return (
    <p className="flex gap-1 text-[12px]">
      {tag.split(",").map((item, idx) => (
        <Badge className="font-bold" key={idx}>
          #{item}
        </Badge>
      ))}
    </p>
  );
}
