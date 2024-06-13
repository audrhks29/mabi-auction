import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function LoginButton() {
  return (
    <Popover>
      <PopoverTrigger className="border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
        로그인
      </PopoverTrigger>

      <PopoverContent className="absolute -right-10">
        <div className="p-3">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input id="user_id" type="text" placeholder="아이디" required />
              <Input id="password" type="password" placeholder="비밀번호" required />
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            계정이 없으신가요?&nbsp;
            <Link href="#" className="underline">
              회원가입
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
