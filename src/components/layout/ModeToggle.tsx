"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ModeToggle() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline" className="cursor-pointer">
            {theme === "light" ? <Sun /> : <Moon />}{" "}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-center mb-3">테마 선택</DrawerTitle>
            <DrawerDescription className="hidden">테마선택입니다.</DrawerDescription>
          </DrawerHeader>

          <div className="grid grid-cols-2 gap-2 w-full">
            <DrawerClose asChild>
              <Card className="text-muted-foreground cursor-pointer hover:bg-muted" onClick={() => setTheme("light")}>
                <CardContent className="flex flex-col items-center gap-2">
                  <div>
                    <Sun size={50} />
                  </div>
                  <p>라이트모드</p>
                </CardContent>
              </Card>
            </DrawerClose>

            <DrawerClose asChild>
              <Card className="text-muted-foreground cursor-pointer hover:bg-muted" onClick={() => setTheme("dark")}>
                <CardContent className="flex flex-col items-center gap-2">
                  <div>
                    <Moon size={50} />
                  </div>
                  <p>다크모드</p>
                </CardContent>
              </Card>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="cursor-pointer">
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-3">테마 선택</DialogTitle>
          <DialogDescription className="hidden">테마선택입니다.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2 w-full">
          <DialogClose asChild>
            <Card className="text-muted-foreground cursor-pointer hover:bg-muted" onClick={() => setTheme("light")}>
              <CardContent className="flex flex-col items-center gap-2">
                <div>
                  <Sun size={50} />
                </div>
                <p>라이트모드</p>
              </CardContent>
            </Card>
          </DialogClose>

          <DialogClose asChild>
            <Card className="text-muted-foreground cursor-pointer hover:bg-muted" onClick={() => setTheme("dark")}>
              <CardContent className="flex flex-col items-center gap-2">
                <div>
                  <Moon size={50} />
                </div>
                <p>다크모드</p>
              </CardContent>
            </Card>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
