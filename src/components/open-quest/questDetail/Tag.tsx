export default function Tag({ tag }: { tag: string }) {
  return (
    <p className="flex gap-1 text-[12px] ">
      {tag ? (
        tag.split(",").map((item, idx) => (
          <span className="badge badge-neutral font-bold" key={idx}>
            #{item}
          </span>
        ))
      ) : (
        <span className="badge badge-neutral skeleton bg-neutral text-neutral text-opacity-0">#태그칸</span>
      )}
    </p>
  );
}
