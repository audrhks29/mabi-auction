"use client";

import rankLists from "@/assets/rank.json";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell } from "../ui/table";
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

export default function SelectRank({ skill }) {
  const [rankByStats, setRankByStats] = useState(initialStats);

  const handleSelectRank = (value: string) => {
    const selectRankIndex = skill.skill_by_rank.findIndex(skill => skill.rank === value);

    const cumulativeBonusStat = skill.skill_by_rank.slice(0, selectRankIndex + 1).reduce((acc, rankInfo) => {
      const bonusStat = rankInfo.bonus_stat;
      if (bonusStat) {
        for (const [key, value] of Object.entries(bonusStat)) {
          if (acc[key]) {
            acc[key] += value;
          } else {
            acc[key] = value;
          }
        }
      }
      return acc;
    }, {});

    const cumulativeAP = skill.skill_by_rank.slice(0, selectRankIndex + 1).reduce((acc, rankInfo) => {
      return acc + rankInfo.ap;
    }, 0);

    const newRankStats = {
      ...initialStats,
      ...cumulativeBonusStat,
      ap: cumulativeAP,
    };

    setRankByStats(newRankStats);
  };

  return (
    <>
      <TableCell>
        <Select onValueChange={value => handleSelectRank(value)}>
          <SelectTrigger>
            <SelectValue placeholder="연습" />
          </SelectTrigger>

          <SelectContent>
            {rankLists.map(rankList => {
              const isPromotion = skill.isPromotion;
              if (isPromotion) {
                return (
                  <SelectItem key={rankList.id} value={rankList.display}>
                    {rankList.display}
                  </SelectItem>
                );
              } else if (rankList.id <= 16) {
                return (
                  <SelectItem key={rankList.id} value={rankList.display}>
                    {rankList.display}
                  </SelectItem>
                );
              }
            })}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        {rankByStats.ap || 0}/{skill.skill_by_total.ap || 0}
      </TableCell>

      <TableCell>
        {rankByStats.hp || 0}/{skill.skill_by_total.hp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.mp || 0}/{skill.skill_by_total.mp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.sp || 0}/{skill.skill_by_total.sp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.str || 0}/{skill.skill_by_total.str || 0}
      </TableCell>

      <TableCell>
        {rankByStats.dex || 0}/{skill.skill_by_total.dex || 0}
      </TableCell>

      <TableCell>
        {rankByStats.int || 0}/{skill.skill_by_total.int || 0}
      </TableCell>

      <TableCell>
        {rankByStats.will || 0}/{skill.skill_by_total.will || 0}
      </TableCell>

      <TableCell>
        {rankByStats.luck || 0}/{skill.skill_by_total.luck || 0}
      </TableCell>
    </>
  );
}
