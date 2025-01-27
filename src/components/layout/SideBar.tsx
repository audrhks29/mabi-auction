"use client";

import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

export default function SideBar() {
  return (
    <div className="drawer w-fit mr-3 lg:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current btn btn-square btn-ghost">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {menuLists.map(menu => (
            <li key={menu.id}>
              {menu.sub_menu ? (
                <details>
                  <summary>{menu.text}</summary>
                  <ul className="p-2">
                    {menu.sub_menu.map(subMenu => (
                      <li
                        key={subMenu.id}
                        onClick={() => {
                          const drawerCheckbox = document.getElementById("my-drawer") as HTMLInputElement;
                          if (drawerCheckbox) {
                            drawerCheckbox.checked = false;
                          }
                        }}>
                        <Link href={subMenu.link}>{subMenu.sub_text}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={menu.link || ""}>{menu.text}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
