"use client";

import rankLists from "@/assets/rank.json";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectRank() {
  const handle = (value: any) => {
    console.log(value);
  };

  return (
    <Select onValueChange={value => handle(value)}>
      <SelectTrigger>
        <SelectValue placeholder="연습" />
      </SelectTrigger>
      <SelectContent>
        {rankLists.map(rankList => (
          <SelectItem key={rankList.id} value={rankList.display}>
            {rankList.display}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
