import { Metadata } from "next";

import Developing from "@/components/shared/Developing";

export const metadata: Metadata = {
  title: "npc 상점",
};

export default function NpcShopPage() {
  return (
    <main className="inner">
      <Developing />
    </main>
  );
}
