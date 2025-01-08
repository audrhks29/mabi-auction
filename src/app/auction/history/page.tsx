import { Metadata } from "next";

import HistoryIndex from "@/components/auction/history/Index";

export const metadata: Metadata = {
  title: "거래 내역",
};

export default function HistoryPage() {
  return (
    <main className="inner">
      <HistoryIndex />
    </main>
  );
}
