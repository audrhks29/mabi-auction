"use client";

import { useState } from "react";

import BigHornOfShoutLists from "@/components/bigHornOfShout/BigHornOfShoutLists";
import SearchBox from "@/components/bigHornOfShout/SearchBox";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BigHornOfShoutPage() {
  const [hornLists, setHornLists] = useState([]);

  return (
    <main className="inner">
      <Card>
        <CardContent className="flex gap-6 flex-col justify-center items-center">
          <SearchBox setHornLists={setHornLists} />
          <Separator />
          <BigHornOfShoutLists hornLists={hornLists} />
        </CardContent>
      </Card>
    </main>
  );
}
