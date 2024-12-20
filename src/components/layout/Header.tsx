import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import UserAuth from "./UserAuth";

const menusArray = [
  { id: 1, text: "경매장", link: "/auction" },
  { id: 2, text: "거대한 뿔피리", link: "/bighornofshout" },
];

export default function Header() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <a href="/">
          <Image width={100} height={64} alt="logo" src={"/logo_black_v2.svg"} />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menusArray.map(menu => (
            <li key={menu.id}>
              <Link href={menu.link}>{menu.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <UserAuth accessToken={accessToken} />
      </div>
    </header>
  );
}
