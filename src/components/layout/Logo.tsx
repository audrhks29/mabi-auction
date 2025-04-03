"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ cn, isMobile }: { cn?: string; isMobile: boolean }) {
  return (
    <Link href="/" className={isMobile ? cn : ""}>
      <h1 className="flex items-center gap-3">
        <Image width={40} height={40} alt="logo" src="/logo_default.png" unoptimized />
        <span className={isMobile ? "hidden" : "text-[20px] font-bold"}>마비옥션</span>
      </h1>
    </Link>
  );
}
