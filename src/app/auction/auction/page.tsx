import { Metadata } from "next";

import AuctionIndex from "@/components/auction/auction/Index";

export const metadata: Metadata = {
  title: "경매장",
};

export default function AuctionPage() {
  return (
    <main className="inner">
      <AuctionIndex />
    </main>
  );
}
