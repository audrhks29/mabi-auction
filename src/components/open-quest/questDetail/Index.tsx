"use client";

import { useQuestDetail } from "@/hooks/open-quest/useQuestDetail";

import QuestDetailContainerIndex from "./container/Index";
import SkeletonIndex from "./container/SkeletonIndex";

import { ErrorData } from "@/components/shared/DataState";

export default function Index({ params }: { params: { id: string } }) {
  const { data, isFetching }: { data: QuestDetailTypes; isFetching: boolean } = useQuestDetail(params.id);

  if (data?.error?.name) return <ErrorData error={data.error} cn="h-[500px]" />;

  return (
    <section>
      <h3 className="text-[18px] font-bold pb-6">오픈 퀘스트</h3>

      {!isFetching ? <QuestDetailContainerIndex data={data} /> : <SkeletonIndex />}
    </section>
  );
}
