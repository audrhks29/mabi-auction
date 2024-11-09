import { Metadata } from "next";

import BigHornOfShoutIndex from "@/components/bigHornOfShout/Index";

export const metadata: Metadata = {
  title: "뿔피리",
};

export default function BigHornOfShoutPage() {
  return (
    <main className="inner">
      <BigHornOfShoutIndex />
    </main>
  );
}
