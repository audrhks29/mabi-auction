"use client";

import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import useUserDataStore from "@/store/userData-store";

import { shallow } from "zustand/shallow";

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

function SelectRank({ skill }: { skill: SkillsTypes }) {
  const params = useParams();
  const router = useRouter();

  const { setApTable, setStatsTable, setRpTable } = useCurrentCategoryInfoStore(
    state => ({
      setApTable: state.setApTable,
      setStatsTable: state.setStatsTable,
      setRpTable: state.setRpTable,
    }),
    shallow,
  );

  const { userData, setUserSkillData } = useUserDataStore();

  const thisSkillRank = userData?.skill_data?.find(r => r.skill_id === skill.skill_id)?.rank;

  const [rankByAp, setRankByAp] = useState(initialAp);
  const [rankByStats, setRankByStats] = useState(initialStats);

  // 랭크 선택 함수
  const handleSelectRank = useCallback(
    (value: string) => {
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

      const newRp = skill.skill_by_rank[selectRankIndex].accumulate_rp;

      setRankByAp(newRankByAP);
      setRankByStats(newRankByStats);

      setApTable(skill, newRankByAP);
      setStatsTable(skill, newRankByStats);
      setRpTable(skill.skill_id, newRp);
    },
    [skill, setApTable, setStatsTable, setRpTable],
  );

  useLayoutEffect(() => {
    if (thisSkillRank) handleSelectRank(thisSkillRank);
  }, [handleSelectRank, thisSkillRank]);

  return (
    <>
      <TableCell>
        <Select
          value={thisSkillRank ? thisSkillRank : "연습"}
          onValueChange={value => {
            handleSelectRank(value);
            setUserSkillData(skill.skill_id, value);
          }}>
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
        {rankByStats.hp || 0}/{skill?.total_stats?.hp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.mp || 0}/{skill?.total_stats?.mp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.sp || 0}/{skill?.total_stats?.sp || 0}
      </TableCell>

      <TableCell>
        {rankByStats.str || 0}/{skill?.total_stats?.str || 0}
      </TableCell>

      <TableCell>
        {rankByStats.dex || 0}/{skill?.total_stats?.dex || 0}
      </TableCell>

      <TableCell>
        {rankByStats.int || 0}/{skill?.total_stats?.int || 0}
      </TableCell>

      <TableCell>
        {rankByStats.will || 0}/{skill?.total_stats?.will || 0}
      </TableCell>

      <TableCell>
        {rankByStats.luck || 0}/{skill?.total_stats?.luck || 0}
      </TableCell>

      <TableCell>
        <Button
          onClick={() => {
            router.push(`/skill/${params.type}/${params.tab}/${skill.skill_id}`);
          }}>
          자세히
        </Button>
      </TableCell>
    </>
  );
}

export default memo(SelectRank);
