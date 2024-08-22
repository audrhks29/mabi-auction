"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const initialStats = {
  hp: 0,
  mp: 0,
  sp: 0,
  str: 0,
  dex: 0,
  int: 0,
  will: 0,
  luck: 0,
};

const initialAp = 0;

export default function CurrentRank({ skill }: { skill: SkillsTypes | undefined }) {
  const [rankByAp, setRankByAp] = useState<number | undefined>(initialAp);
  const [rankByStats, setRankByStats] = useState(initialStats);

  const handleSelectRank = (value: string) => {
    const selectRankIndex = skill?.skill_by_rank.findIndex(skill => skill.rank === value);

    if (selectRankIndex) {
      const newRankByAP = skill?.skill_by_rank[selectRankIndex].accumulate_ap;

      const newRankByStats = {
        hp: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.hp || 0,
        mp: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.mp || 0,
        sp: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.sp || 0,
        str: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.str || 0,
        dex: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.dex || 0,
        int: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.int || 0,
        will: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.will || 0,
        luck: skill?.skill_by_rank[selectRankIndex].accumulate_stats?.luck || 0,
      };

      setRankByAp(newRankByAP);
      setRankByStats(newRankByStats);
    }
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Rank</TableHead>
            <TableHead>ap</TableHead>
            <TableHead>hp</TableHead>
            <TableHead>mp</TableHead>
            <TableHead>sp</TableHead>
            <TableHead>str</TableHead>
            <TableHead>dex</TableHead>
            <TableHead>int</TableHead>
            <TableHead>will</TableHead>
            <TableHead>luck</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Select onValueChange={value => handleSelectRank(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="연습" />
                </SelectTrigger>

                <SelectContent>
                  {skill?.skill_by_rank?.map((item, index) => (
                    <SelectItem key={index} value={item.rank}>
                      {item.rank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell>{rankByAp}</TableCell>
            <TableCell>{rankByStats?.hp}</TableCell>
            <TableCell>{rankByStats?.mp}</TableCell>
            <TableCell>{rankByStats?.sp}</TableCell>
            <TableCell>{rankByStats?.str}</TableCell>
            <TableCell>{rankByStats?.dex}</TableCell>
            <TableCell>{rankByStats?.int}</TableCell>
            <TableCell>{rankByStats?.will}</TableCell>
            <TableCell>{rankByStats?.luck}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
