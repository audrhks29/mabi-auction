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
    <Button type="button" variant="outline" className="w-[31.5px]">
      <LoaderCircle className="animate-spin" />
    </Button>
  ),
});

export default function Header() {
  return (
    <header className="relative px-3 flex w-full items-center justify-between h-16 bg-primary-foreground">
      <div className="flex gap-3 items-center">
        <SideBar />
        <Logo />
      </div>

      <div className="hidden md:block h-full">
        <MenuBar />
      </div>

      {/* 로그인, 로그아웃 */}
      <div className="flex gap-3">
        <ModeToggle />
        <UserAuth cn="hidden md:block" />
      </div>
    </header>
  );
}
