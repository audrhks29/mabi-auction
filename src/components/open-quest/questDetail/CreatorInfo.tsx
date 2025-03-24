import { CircleUserIcon } from "lucide-react";

export default function CreatorInfo({ server, name }: { server: string; name: string }) {
  return (
    <div className="flex gap-1 items-center">
      {name && <CircleUserIcon height="18" />}
      <p className="text-[14px] font-bold">
        {name ? (
          <>
            {server && <span className="mr-1">[{server}]</span>}
            <span>{name}</span>
          </>
        ) : (
          <span className="skeleton text-base-300 text-opacity-0">서버 닉네임 스켈레톤</span>
        )}
      </p>
    </div>
  );
}
