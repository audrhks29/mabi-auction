import Link from "next/link";

import { Button } from "../ui/button";

export default function Header() {
  return (
    <nav className="flex h-14 justify-between items-center">
      <div className="flex h-14">
        <h1 className="w-16">로고</h1>

        <ul className="h-full">
          <li className="w-[200px] text-center h-full hover:bg-muted cursor-pointer">
            <Link href="/skill" className="flex w-full h-full justify-center items-center">
              스킬
            </Link>
          </li>
        </ul>
      </div>

      <Button type="button" variant="outline">
        로그인
      </Button>
    </nav>
  );
}
