"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:-translate-x-0 md:-translate-y-0">
      <h1 className="flex items-center gap-3">
        <Image width={40} height={40} alt="logo" src="/logo_default.png" unoptimized />
        <span className="hidden md:block md:text-[20px] md:font-bold">마비옥션</span>
      </h1>
    </Link>
  );
}
