import { Metadata } from "next";

import Developing from "@/components/shared/Developing";

export const metadata: Metadata = {
  title: "즐겨찾기",
};

export default function HistoryPage() {
  return (
    <main className="inner">
      <Developing />
    </main>
  );
}
