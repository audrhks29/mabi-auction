"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

const initialStats = {
  ap: 0,
  hp: 0,
  mp: 0,
  sp: 0,
  str: 0,
  dex: 0,
  int: 0,
  will: 0,
  luck: 0,
};

export default function CurrentRank({
  totalStats,
  rank,
}: {
  totalStats: SkillByTotalTypes | undefined;
  rank: SkillByRankTypes[] | undefined;
}) {
  const [rankByStats, setRankByStats] = useState(initialStats);

  const handleSelectRank = (value: string) => {
    const selectRankIndex = rank?.findIndex(skill => skill.rank === value) || 0;
    const cumulativeBonusStat = rank?.slice(0, selectRankIndex + 1).reduce((acc: StatsTypes, rankInfo) => {
      const bonusStat = rankInfo.bonus_stat;

      if (bonusStat) {
        for (const [key, value] of Object.entries(bonusStat)) {
          if (key in acc) {
            acc[key as keyof StatsTypes] = (acc[key as keyof StatsTypes] || 0) + (value as number);
          } else {
            acc[key as keyof StatsTypes] = value as number;
          }
        }
      }
      return acc;
    }, {} as StatsTypes);

    // 누적 ap 계산
    const cumulativeAP =
      rank?.slice(0, selectRankIndex + 1).reduce((acc, rankInfo) => {
        return acc + rankInfo.ap;
      }, 0) || 0;

    const newRankStats = {
      ...initialStats,
      ...cumulativeBonusStat,
      ap: cumulativeAP,
    };

    setRankByStats(newRankStats);
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
                  {rank?.map((item, index) => (
                    <SelectItem key={index} value={item.rank}>
                      {item.rank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell>{rankByStats?.ap}</TableCell>
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
