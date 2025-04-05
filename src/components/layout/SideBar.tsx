"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import menuLists from "@/assets/menuLists.json";

import UserAuth from "./UserAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SideBar({ isMobile }: { isMobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.removeProperty("overflow");

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    <div className="text-[14px]">
      <div>
        <Button className="button" variant="outline" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </div>

      {isOpen && (
        <aside className="absolute left-0 top-0 z-10 bg-sidebar w-screen h-screen animate-sidebar overflow-auto">
          {/* 헤더 */}
          <div className="h-16 flex items-center px-3 bg-secondary justify-between">
            <div onClick={() => setIsOpen(false)} className="w-12 cursor-pointer">
              <X />
            </div>

            {isMobile && <UserAuth />}
          </div>

          <Separator />

          <div className="p-3 flex flex-col gap-3">
            {menuLists.map(menu => (
              <div key={menu.id}>
                <p className="py-3 font-bold text-sidebar-foreground/50">{menu.text}</p>
                <hr />
                <div className="px-3 flex flex-col gap-3 pt-3">
                  {menu.sub_menu.map(subMenu => (
                    <Link
                      key={subMenu.id}
                      href={subMenu.link}
                      onClick={() => setIsOpen(false)}
                      className="hover:underline">
                      {subMenu.sub_text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
