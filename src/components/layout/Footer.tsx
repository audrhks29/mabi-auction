import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer hidden md:block bg-primary-foreground px-10 py-10 ">
      <div className="max-w-[1300px] m-auto grid gap-5">
        <div>
          <Logo />
        </div>

        <nav className="grid grid-cols-4 gap-10 text-[14px]">
          {menuLists.map((menu, index) => (
            <div key={menu.id} className="border-t ">
              <p className="text-card-foreground/50 py-2 font-bold">{menu.english_text}</p>
              <div className="flex flex-col gap-1">
                {menu.sub_menu.map(subMenu => (
                  <Link
                    key={subMenu.id + index}
                    href={subMenu.link}
                    className="hover:underline hover:underline-offset-4">
                    {subMenu.english_sub_text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <p className="text-[12px] text-card-foreground/20">본 사이트는 넥슨 OPEN API를 이용하여 제작되었습니다.</p>
      </div>
    </footer>
  );
}
