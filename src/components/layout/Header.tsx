"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

import UserAuth from "./UserAuth";
import SideBar from "./SideBar";
import MenuBar from "./MenuBar";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const ModeToggle = dynamic(() => import("./ModeToggle"), {
  ssr: false,
  loading: () => (
    <Button type="button" variant="outline">
      <LoaderCircle className="animate-spin" />
    </Button>
  ),
});

import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="relative px-3 flex w-full items-center justify-between h-16 bg-primary-foreground">
      <div className="flex gap-3 items-center">
        {isMobile && <SideBar isMobile={isMobile} />}
        <Logo cn="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" isMobile={isMobile} />
      </div>

      <div className="hidden md:block h-full">
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
