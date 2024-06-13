import Link from "next/link";

import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="fixed bg-background w-full">
      <nav className="flex h-14 justify-between items-center">
        <div className="flex h-14">
          <h1 className="w-16 cursor-pointer">
            <Link href="/" className="flex w-full h-full justify-center items-center">
              로고
            </Link>
          </h1>

          <ul className="h-full">
            <li className="w-[200px] text-center h-full hover:bg-muted cursor-pointer">
              <Link href="/skill" className="flex w-full h-full justify-center items-center">
                스킬
              </Link>
            </li>
          </ul>
        </div>

        <LoginButton />
      </nav>
    </header>
  );
}
