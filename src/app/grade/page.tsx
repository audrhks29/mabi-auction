"use client";

import Talents from "@/components/grade/Talents";
import TalentsGradeDetail from "@/components/grade/TalentsGradeDetail";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function GradePage() {
  const [selectedTalent, setSelectedTalent] = useState("상인");

  return (
    <main className="inner">
      <Card className="grid grid-cols-[400px_1fr]">
        <Talents selectedTalent={selectedTalent} setSelectedTalent={setSelectedTalent} />

        <TalentsGradeDetail selectedTalent={selectedTalent} setSelectedTalent={setSelectedTalent} />
      </Card>
    </main>
  );
}
