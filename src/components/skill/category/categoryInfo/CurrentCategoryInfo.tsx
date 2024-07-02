"use client";

import TalentRp from "./TalentRp";
import StatsTable from "./StatsTable";

export default function CurrentCategoryInfo() {
  return (
    <article className="grid grid-cols-2 gap-3">
      <StatsTable />

      <TalentRp />
    </article>
  );
}
