"use client";

import { useState } from "react";

import Category from "./Category";
import QuestByCategory from "./QuestByCategory";
import QuestByAll from "./QuestByAll";

export default function Quest() {
  const [category, setCategory] = useState("ALL");

  return (
    <article>
      <Category category={category} setCategory={setCategory} />
      {category === "ALL" ? (
        <QuestByAll category={category} setCategory={setCategory} />
      ) : (
        <QuestByCategory category={category} />
      )}
    </article>
  );
}
