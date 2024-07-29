import Link from "next/link";

import LoginButton from "./LoginButton";
interface MenuTypes {
  id: number;
  text: string;
  link: string;
}

const menusArray = [
  { id: 1, text: "스킬", link: "/skill" },
  { id: 2, text: "재능등급", link: "/grade" },
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

        <LoginButton />
      </nav>
    </header>
  );
}
