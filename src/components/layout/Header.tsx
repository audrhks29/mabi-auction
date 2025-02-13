import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

import UserAuth from "./UserAuth";
import SideBar from "./SideBar";
import MenuBar from "./MenuBar";
import Logo from "./Logo";
import ThemeController from "./ThemeController";

export default async function Header() {
  const cookieStore = await (cookies() as unknown as UnsafeUnwrappedCookies);
  const accessToken = cookieStore.get("accessToken");

  return (
    <header className="navbar fixed z-10 bg-base-200 block p-0">
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <SideBar />
          <Logo />
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
