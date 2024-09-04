"use client";

import { memo, useCallback, useLayoutEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import useUserDataStore from "@/store/userData-store";

import { shallow } from "zustand/shallow";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Stats_ap_rpType = {
  ap: number;
  hp: number;
  mp: number;
  sp: number;
  str: number;
  dex: number;
  int: number;
  will: number;
  luck: number;
  rp: RpTypes[] | null;
};

const initial_stats_ap_rp = {
  ap: 0,
  hp: 0,
  mp: 0,
  sp: 0,
  str: 0,
  dex: 0,
  int: 0,
  will: 0,
  luck: 0,
  rp: null,
};

function SelectRank({ skill }: { skill: SkillsTypes }) {
  // console.log(skill);
  const params = useParams();
  const router = useRouter();

  const {
    setApTable,
    setStatsTable,
    setRpTable,
    current_category_skill_array,
    setCurrentCategorySkill,
    setSelectedSkillRank,
  } = useCurrentCategoryInfoStore(
    state => ({
      setApTable: state.setApTable,
      setStatsTable: state.setStatsTable,
      setRpTable: state.setRpTable,
      current_category_skill_array: state.current_category_skill_array,
      setCurrentCategorySkill: state.setCurrentCategorySkill,
      setSelectedSkillRank: state.setSelectedSkillRank,
    }),
    shallow,
  );

  const { userData, setUserSkillData } = useUserDataStore(
    state => ({
      userData: state.userData,
      setUserSkillData: state.setUserSkillData,
    }),
    shallow,
  );
  // console.log(current_category_skill_array);
  const thisSkillRank = current_category_skill_array?.find(r => r.skill_id === skill.skill_id)?.rank;

  // console.log(thisSkillRank);

  const [selectedRank_stats_ap_rp, setSelectRank_stats_ap_rp] = useState<Stats_ap_rpType>(initial_stats_ap_rp);
  // 랭크 선택 함수
  const handleSelectRank = useCallback(
    (value: string) => {
      const selectedRank = skill.skill_by_rank[skill.skill_by_rank.findIndex(skill => skill.rank === value)];

      const newRank_stats_ap_rp = {
        ap: selectedRank.accumulate_ap || 0,
        hp: selectedRank.accumulate_stats?.hp || 0,
        mp: selectedRank.accumulate_stats?.mp || 0,
        sp: selectedRank.accumulate_stats?.sp || 0,
        str: selectedRank.accumulate_stats?.str || 0,
        dex: selectedRank.accumulate_stats?.dex || 0,
        int: selectedRank.accumulate_stats?.int || 0,
        will: selectedRank.accumulate_stats?.will || 0,
        luck: selectedRank.accumulate_stats?.luck || 0,
        rp: selectedRank.accumulate_rp,
      };

      setSelectRank_stats_ap_rp(newRank_stats_ap_rp);
      setSelectedSkillRank(skill.skill_id, selectedRank.rank);

      setApTable(skill, newRank_stats_ap_rp.ap);
      setStatsTable(skill, newRank_stats_ap_rp);
      setRpTable(skill.skill_id, newRank_stats_ap_rp.rp);
    },
    [skill, setSelectedSkillRank, setApTable, setStatsTable, setRpTable],
  );

  useLayoutEffect(() => {
    if (thisSkillRank) handleSelectRank(thisSkillRank);
    // setSelectedSkillRank(skill, thisSkillRank);
  }, [handleSelectRank, thisSkillRank]);

  // useLayoutEffect(() => {}, []);

  return (
    <>
      <TableCell>
        <Select
          value={thisSkillRank}
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
        {selectedRank_stats_ap_rp.ap || 0}/{skill.total_need_ap || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.hp || 0}/{skill?.total_stats?.hp || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.mp || 0}/{skill?.total_stats?.mp || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.sp || 0}/{skill?.total_stats?.sp || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.str || 0}/{skill?.total_stats?.str || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.dex || 0}/{skill?.total_stats?.dex || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.int || 0}/{skill?.total_stats?.int || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.will || 0}/{skill?.total_stats?.will || 0}
      </TableCell>

      <TableCell>
        {selectedRank_stats_ap_rp.luck || 0}/{skill?.total_stats?.luck || 0}
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
