import Link from "next/link";

import menuLists from "@/assets/menuLists.json";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer hidden sm:grid sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside className="m-auto ml-0">
        <Logo />
        <p className="p-0">본 사이트는 넥슨 OPEN API를 이용하여 제작되었습니다.</p>
      </aside>

      {menuLists.map((menu, index) => (
        <nav key={menu.id}>
          <h6 className="footer-title">{menu.english_text}</h6>
          {menu.sub_menu ? (
            menu.sub_menu.map(subMenu => (
              <Link key={subMenu.id + index} href={subMenu.link} className="link link-hover">
                {subMenu.english_sub_text}
              </Link>
            ))
          ) : (
            <Link key={menu.id + index} href={menu.link} className="link link-hover">
              {menu.english_text}
            </Link>
          )}
        </nav>
      ))}
    </footer>
  );
}
