export default function ErrorMessage({ message }: { message: string | undefined }) {
  return (
    <div className="grid grid-cols-[90px_1fr] items-center gap-1">
      <p></p>
      <p className="text-[12px] text-red-600">{message}</p>
    </div>
  );
}
