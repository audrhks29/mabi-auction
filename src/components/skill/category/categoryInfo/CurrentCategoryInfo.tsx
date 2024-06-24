"use client";

import { useLayoutEffect } from "react";
import { useParams } from "next/navigation";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import TalentRp from "./TalentRp";
import StatsTable from "./StatsTable";

export default function CurrentCategoryInfo() {
  const { initialMyStats, initialRp } = useCurrentCategoryInfoStore();

  const params = useParams();

  // 카테고리에 맞는 스킬 리스트

  // 카테고리(페이지) 전환시 myStats 초기화
  useLayoutEffect(() => {
    initialRp();
    initialMyStats();
  }, [initialMyStats, initialRp, params.category]);

  // 테이블의 초기 값

  return (
    <article className="grid grid-cols-2 gap-3">
      <StatsTable />

      <TalentRp />
    </article>
  );
}
