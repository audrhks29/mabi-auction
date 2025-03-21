export default function CreatorInfo({ server, name }: { server: string; name: string }) {
  const isGM = name === "마비노기GM";

  return (
    <p className="text-[14px] font-bold">
      {!isGM && <span className="mr-1">[{server}]</span>}
      <span>{name}</span>
    </p>
  );
}
