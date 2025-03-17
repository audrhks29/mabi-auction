import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="flex items-center gap-3">
        <Image width={40} height={40} alt="logo" src="/logo_default.png" />
        <span className="text-[20px] font-bold">마비옥션</span>
      </h1>
    </Link>
  );
}
