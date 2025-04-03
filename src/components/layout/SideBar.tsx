"use client";

import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

import { Drawer, DrawerContent, DrawerPortal, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Calendar, Home, Inbox, Menu, Search, Settings, X } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import UserAuth from "./UserAuth";

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
            {menuLists.map(menu =>
              menu.sub_menu ? (
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
              ) : (
                <div key={menu.id}>
                  <Link
                    href={menu.link}
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-sidebar-foreground/50 hover:underline">
                    {menu.text}
                  </Link>
                </div>
              ),
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
