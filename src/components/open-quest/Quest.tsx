"use client";

import { useState } from "react";

import Category from "./Category";
import QuestByCategory from "./QuestByCategory";
import QuestByAll from "./QuestByAll";
import { Separator } from "@/components/ui/separator";

export default function Quest() {
  const [category, setCategory] = useState("ALL");

  return (
    <article>
      <Category setCategory={setCategory} />

      <Separator />

      {category === "ALL" ? <QuestByAll setCategory={setCategory} /> : <QuestByCategory category={category} />}
    </article>
  );
}
