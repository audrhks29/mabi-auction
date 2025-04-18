import { CircleUserIcon } from "lucide-react";

export default function CreatorInfo({ server, name }: { server: string; name: string }) {
  return (
    <div className="flex gap-1 items-center">
      <CircleUserIcon height="18" />
      <p className="font-bold">
        {server && <span className="mr-1 text-primary/80">[{server}]</span>}
        <span className="text-primary/80">{name}</span>
      </p>
    </div>
  );
}
