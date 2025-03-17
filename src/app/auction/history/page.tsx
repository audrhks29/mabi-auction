import { Metadata } from "next";

import HistoryIndex from "@/components/auction/history/Index";

export const metadata: Metadata = {
  title: "거래 내역",
  description: "마비옥션에서 경매장 거래내역을 검색해보세요",
  keywords: ["마비노기 경매장 거래내역", "마비노기 거래내역", "마비노기 경매장"],
};

export default function HistoryPage() {
  return (
    <main className="inner">
      <HistoryIndex />
    </main>
  );
}
