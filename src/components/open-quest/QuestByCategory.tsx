"use client";

import { useQuestLists } from "@/hooks/open-quest/useQuestLists";
import QuestLists from "./QuestLists";

export default function QuestByCategory({ category }: { category: string }) {
  const { data }: { data: QuestListTypes } = useQuestLists(category);

  return <QuestLists data={data?.quest} category={category} />;
}
