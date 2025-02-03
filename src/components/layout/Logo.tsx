"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const logoSrc = theme === "dark" ? "/logo_black.png" : "/logo_light.png";

  return (
    <Link href="/">
      <h1 className="flex items-center gap-3">
        <Image width={40} height={40} alt="logo" src={logoSrc} />
        <span className="text-[20px] font-bold">마비옥션</span>
      </h1>
    </Link>
  );
}
