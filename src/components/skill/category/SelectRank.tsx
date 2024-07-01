"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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

export default function SelectRank({ skill }: { skill: SkillsTypes }) {
  const router = useRouter();

  const [rankByAp, setRankByAp] = useState(initialAp);
  const [rankByStats, setRankByStats] = useState(initialStats);

  // detail 버튼 클릭 함수
  const handleClickDetail = (talent: string, id: number) => {
    router.push(`/skill/${talent}/${id}`);
  };

  // 랭크 선택 함수
  const handleSelectRank = (value: string) => {
    const selectRankIndex = skill.skill_by_rank.findIndex(skill => skill.rank === value);
    const newRankByAP = skill.skill_by_rank[selectRankIndex].accumulate_ap;

    const newRankByStats = {
      hp: skill.skill_by_rank[selectRankIndex].accumulate_stats?.hp || 0,
      mp: skill.skill_by_rank[selectRankIndex].accumulate_stats?.mp || 0,
      sp: skill.skill_by_rank[selectRankIndex].accumulate_stats?.sp || 0,
      str: skill.skill_by_rank[selectRankIndex].accumulate_stats?.str || 0,
      dex: skill.skill_by_rank[selectRankIndex].accumulate_stats?.dex || 0,
      int: skill.skill_by_rank[selectRankIndex].accumulate_stats?.int || 0,
      will: skill.skill_by_rank[selectRankIndex].accumulate_stats?.will || 0,
      luck: skill.skill_by_rank[selectRankIndex].accumulate_stats?.luck || 0,
    };
    setRankByAp(newRankByAP);
    setRankByStats(newRankByStats);
  };

  return (
    <>
      <TableCell>
        <Select onValueChange={value => handleSelectRank(value)}>
          <SelectTrigger>
            <SelectValue placeholder="연습" />
          </SelectTrigger>

          <SelectContent>
            {skill.skill_by_rank.map((item, index) => (
              <SelectItem key={index} value={item.rank}>
                {item.rank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>

      <TableCell>
        {rankByAp || 0}/{skill.total_need_ap || 0}
      </TableCell>

      <TableCell>
        {rankByStats.hp || 0}/{skill.total_stats.hp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.mp || 0}/{skill.total_stats.mp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.sp || 0}/{skill.total_stats.sp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.str || 0}/{skill.total_stats.str || 0}
      </TableCell>

      <TableCell>
        {rankByStats.dex || 0}/{skill.total_stats.dex || 0}
      </TableCell>

      <TableCell>
        {rankByStats.int || 0}/{skill.total_stats.int || 0}
      </TableCell>

      <TableCell>
        {rankByStats.will || 0}/{skill.total_stats.will || 0}
      </TableCell>

      <TableCell>
        {rankByStats.luck || 0}/{skill.total_stats.luck || 0}
      </TableCell>

      <TableCell>
        <Button onClick={() => handleClickDetail(skill.category, skill.skill_id)}>자세히</Button>
      </TableCell>
    </>
  );
}
