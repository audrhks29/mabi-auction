import Image from "next/image";

export default function QuestImage({
  match,
  title,
  cn,
}: {
  match: RegExpMatchArray | null;
  title: string;
  cn: string;
}) {
  return (
    <div className={`relative aspect-[9/6] overflow-hidden w-full ${cn}`}>
      {match && (
        <Image
          src={`https://openquest-image.nexon.com/${match[1]}`}
          fill
          sizes="100%"
          className={`transition-transform duration-300 ease-in-out group-hover:scale-110`}
          style={{ objectFit: "cover" }}
          alt={title}
          unoptimized
        />
      )}
    </div>
  );
}
