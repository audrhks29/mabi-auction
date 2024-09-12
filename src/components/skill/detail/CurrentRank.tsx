"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { statsTitle } from "@/utils/stats/statsTitle";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

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

export default function CurrentRank({
  skill,
  userSkillData,
  setUserSkillData,
}: {
  skill: SkillsTypes | undefined;
  userSkillData: string;
  setUserSkillData: Dispatch<SetStateAction<string>>;
}) {
  const [rankByAp, setRankByAp] = useState<number | undefined>(initialAp);
  const [rankByStats, setRankByStats] = useState(initialStats);

  const handleSelectRank = useCallback(
    (value: string) => {
      setUserSkillData(value);
      const selectRankIndex = skill?.skill_by_rank.findIndex(skill => skill.rank === value);

      if (selectRankIndex || selectRankIndex === 0) {
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
    },
    [setUserSkillData, skill?.skill_by_rank],
  );

  useEffect(() => {
    handleSelectRank(userSkillData);
  }, [handleSelectRank, userSkillData]);

  return (
    <div className="flex gap-3 justify-center items-center">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Rank</TableHead>
            <TableHead>ap</TableHead>
            {statsTitle.map(stat => (
              <TableCell key={stat}>{stat}</TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Select onValueChange={value => handleSelectRank(value)} value={userSkillData}>
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

            {statsTitle.map(stat => (
              <TableCell key={stat}>{rankByStats?.[stat]}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
