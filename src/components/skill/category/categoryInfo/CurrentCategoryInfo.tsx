"use client";

import { useLayoutEffect } from "react";
import { useParams } from "next/navigation";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import TalentRp from "./TalentRp";
import StatsTable from "./StatsTable";

export default function CurrentCategoryInfo() {
  const { initialMyStats, initialRp } = useCurrentCategoryInfoStore();

  const params = useParams();

  // 카테고리(페이지) 전환시 myStats 초기화
  useLayoutEffect(() => {
    initialRp();
    initialMyStats();
  }, [initialMyStats, initialRp, params.category]);

  return (
    <article className="grid grid-cols-2 gap-3">
      <StatsTable />

      <TalentRp />
    </article>
  );
}
