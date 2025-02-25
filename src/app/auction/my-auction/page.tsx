import { Metadata } from "next";

import MyAuctionIndex from "@/components/auction/my-auction/Index";

export const metadata: Metadata = {
  title: "내 경매",
};

export default function MyAuctionPage() {
  return (
    <main className="inner">
      <MyAuctionIndex />
    </main>
  );
}
