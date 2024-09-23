import Link from "next/link";

import UserAuth from "./UserAuth";
import { cookies } from "next/headers";
interface MenuTypes {
  id: number;
  text: string;
  link: string;
}

const menusArray = [
  { id: 1, text: "경매장", link: "/auction" },
  { id: 2, text: "거대한 뿔피리", link: "/bighornofshout" },
  { id: 3, text: "스킬", link: "/skill" },
  { id: 4, text: "재능등급", link: "/grade" },
];

function NavMenu({ menu }: { menu: MenuTypes }) {
  return (
    <ul className="h-full">
      <li className="w-[200px] text-center h-full hover:bg-muted cursor-pointer">
        <Link href={menu.link} className="flex w-full h-full justify-center items-center">
          {menu.text}
        </Link>
      </li>
    </ul>
  );
}

export default function Header() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="fixed bg-background w-full z-40">
      <nav className="flex h-14 justify-between items-center">
        <div className="flex h-14">
          <h1 className="w-16 cursor-pointer">
            <Link href="/" className="flex w-full h-full justify-center items-center">
              로고
            </Link>
          </h1>

          {menusArray.map(menu => (
            <NavMenu key={menu.id} menu={menu} />
          ))}
        </div>

        <UserAuth accessToken={accessToken} />
      </nav>
    </header>
  );
}
