import { Metadata } from "next";

import AuctionIndex from "@/components/auction/Index";

export const metadata: Metadata = {
  title: "경매장",
  description: "마비옥션에서 경매장 물품을 검색해보세요",
  keywords: "마비노기 경매장",
};

export default function AuctionPage() {
  return (
    <main className="inner">
      <AuctionIndex />
    </main>
  );
}
