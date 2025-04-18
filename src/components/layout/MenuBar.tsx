"use client";

import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

export default function MenuBar() {
  return (
    <nav className="group w-[400px] lg:w-[500px] h-full text-center">
      {/* 상단 메뉴 */}
      <div className="relative h-full">
        <ul className="grid grid-cols-4 items-center h-full">
          {menuLists.map(menu => (
            <li key={menu.id} className="cursor-pointer w-full h-full flex items-center justify-center">
              {menu.text}
            </li>
          ))}
        </ul>

        <div className="hidden group-hover:grid grid-cols-4 w-full absolute top-full left-1/2 -translate-x-1/2 z-20">
          {menuLists.map(menu => (
            <ul
              key={menu.id}
              className="relative py-3 flex flex-col gap-3 hover:after:content-[''] hover:after:absolute hover:after:top-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-card-foreground/50 hover:after:animate-menubar">
              {menu.sub_menu.map(subMenu => (
                <li key={subMenu.id} className="text-card-foreground/50">
                  <Link href={subMenu.link} className="hover:underline hover:underline-offset-4">
                    {subMenu.sub_text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="absolute top-full left-0 hidden group-hover:block shadow-md z-10 bg-secondary/50 h-40 backdrop-blur-md w-full"></div>
    </nav>
  );
}
