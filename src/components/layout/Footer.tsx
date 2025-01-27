import Image from "next/image";
import Link from "next/link";

import menuLists from "@/assets/menuLists.json";

export default function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside className="m-auto ml-0">
        <Link href="/">
          <Image width={120} height={64} alt="logo" src={"/logo_black_v2.svg"} />
        </Link>
        <p className="p-0">본 사이트는 넥슨 OPEN API를 이용하여 제작되었습니다.</p>
      </aside>

      {menuLists.map(menu => (
        <nav key={menu.id}>
          <h6 className="footer-title">{menu.english_text}</h6>
          {menu.sub_menu?.map(subMenu => (
            <Link key={subMenu.id} href={subMenu.link} className="link link-hover">
              {subMenu.english_sub_text}
            </Link>
          ))}
        </nav>
      ))}
    </footer>
  );
}
