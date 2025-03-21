import OpenQuestIndex from "@/components/open-quest/Index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오픈퀘스트",
  description: "마비옥션에서 오픈퀘스트를 검색해보세요",
  keywords: "마비노기 오픈퀘스트",
};

export default function OpenQuestPage() {
  return (
    <main className="inner">
      <OpenQuestIndex />
    </main>
  );
}
