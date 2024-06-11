"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar({ data }: { data: SkillsTypes | undefined }) {
  const [barPosition, setBarPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setBarPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="absolute left-0 flex justify-between w-full" style={{ top: barPosition }}>
      <Card>
        <CardContent className="p-6">
          <Link href="#" className="block">
            맨위로
          </Link>

          {data?.skill_by_rank.map(item => (
            <Link href={`#${item.rank}`} key={item.rank} className="block">
              {item.rank}
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 grid gap-1">
          <h2>나의 랭크</h2>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="연습" />
            </SelectTrigger>

            <SelectContent>
              {data?.skill_by_rank.map((item, index) => (
                <SelectItem key={index} value={item.rank}>
                  {item.rank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="outline">
            자세히
          </Button>
          <Button type="button">저장</Button>
        </CardContent>
      </Card>
    </section>
  );
}
