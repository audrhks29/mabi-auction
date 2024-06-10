"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar({ data }: { data: SkillsTypes | undefined }) {
  const [barPosition, setBarPosition] = useState(510);

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
    <section className="absolute left-0" style={{ top: barPosition }}>
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
    </section>
  );
}
