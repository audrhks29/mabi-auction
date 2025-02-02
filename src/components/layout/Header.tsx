import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import UserAuth from "./UserAuth";

import SideBar from "./SideBar";
import MenuBar from "./MenuBar";
import ThemeController from "./ThemeController";

export default function Header() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="navbar fixed z-10 bg-base-200 block p-0">
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <SideBar />
          <Link href="/">
            <Image width={120} height={64} alt="logo" src={"/logo_black_v2.svg"} />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <MenuBar />
        </div>

        {/* 로그인, 로그아웃 */}
        <div className="navbar-end gap-3">
          <ThemeController />
          <UserAuth accessToken={accessToken} />
        </div>
      </div>
    </header>
  );
}
