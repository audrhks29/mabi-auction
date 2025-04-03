"use client";

import dynamic from "next/dynamic";

import UserAuth from "./UserAuth";
import SideBar from "./SideBar";
import MenuBar from "./MenuBar";
import Logo from "./Logo";

const ModeToggle = dynamic(() => import("./ModeToggle"), {
  ssr: false,
});

import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="fixed z-10 px-3 flex w-full items-center justify-between h-16 bg-primary-foreground">
      <div className="flex gap-3 items-center">
        {isMobile && <SideBar isMobile={isMobile} />}
        <Logo cn="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" isMobile={isMobile} />
      </div>

      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:block">
        <MenuBar />
      </div>

      {/* 로그인, 로그아웃 */}
      <div className="flex gap-3">
        <ModeToggle />
        {!isMobile && <UserAuth />}
      </div>
    </header>
  );
}
