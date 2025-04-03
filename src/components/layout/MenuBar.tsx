"use client";

import React, { useRef } from "react";
import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function MenuBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuLists.map(menu =>
          menu.sub_menu ? (
            <NavigationMenuItem key={menu.id}>
              <NavigationMenuTrigger className="cursor-pointer bg-secondary">{menu.text}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[100px] absolute top-11 left-0 bg-popover rounded-md border shadow p-1">
                  {menu.sub_menu.map(subMenu => (
                    <li key={subMenu.id} className="w-full">
                      <NavigationMenuLink href={subMenu.link} className="w-full block">
                        {subMenu.sub_text}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={menu.id} className="hover:underline">
              <Link href="/open-quest" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{menu.text}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
