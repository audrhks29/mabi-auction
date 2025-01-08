import { Metadata } from "next";

import Developing from "@/components/shared/Developing";

export const metadata: Metadata = {
  title: "내 경매",
};

export default function MyAuctionPage() {
  return (
    <main className="inner">
      <Developing />
    </main>
  );
}
