"use client";

import Link from "next/link";

import menuLists from "@/assets/menuLists.json";
import { useEffect, useRef } from "react";

export default function MenuBar() {
  const detailsRefs = useRef<{ [key: number]: HTMLDetailsElement | null }>({});

  const handleSubMenuClick = (menuId: number) => {
    const currentRef = detailsRefs.current[menuId];
    if (currentRef) {
      currentRef.open = false;
    }
  };

  // 영역 밖 클릭시 메인메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.values(detailsRefs.current).forEach(ref => {
        if (ref && ref.open && !ref.contains(event.target as Node)) {
          ref.open = false;
        }
      });
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ul className="menu menu-horizontal px-1">
      {menuLists.map(menu =>
        menu.sub_menu ? (
          <li key={menu.id}>
            <details
              id={`side_bar_${menu.id}`}
              ref={el => {
                detailsRefs.current[menu.id] = el as HTMLDetailsElement;
              }}>
              <summary>{menu.text}</summary>
              <ul className="p-2 w-[150px] bg-base-300">
                {menu.sub_menu.map(subMenu => (
                  <li key={subMenu.id} onClick={() => handleSubMenuClick(menu.id)}>
                    <Link href={subMenu.link}>{subMenu.sub_text}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ) : (
          <li key={menu.id} onClick={() => handleSubMenuClick(menu.id)}>
            <Link href={menu.link}>{menu.text}</Link>
          </li>
        ),
      )}
    </ul>
  );
}
