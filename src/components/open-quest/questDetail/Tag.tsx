export default function Tag({ tag }: { tag: string }) {
  return (
    <p className="flex gap-1">
      {tag.split(",").map((item, idx) => (
        <span className="badge badge-neutral text-[12px] font-bold" key={idx}>
          #{item}
        </span>
      ))}
    </p>
  );
}
