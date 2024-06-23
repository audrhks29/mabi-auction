"use client";

import { useParams } from "next/navigation";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import skillLists from "@/assets/skill/human/skill.json";

import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";
import { useLayoutEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CurrentCategoryInfo() {
  const { myStats, initialMyStats } = useCurrentCategoryInfoStore();

  const params = useParams();

  // 카테고리에 맞는 스킬 리스트
  const sameTalentSkillLists: Array<{ skill_by_total: Partial<SkillByTotalTypes> }> = skillLists.filter(
    item => item.category === params.category,
  );

  // 카테고리(페이지) 전환시 myStats 초기화
  useLayoutEffect(() => {
    initialMyStats();
  }, [initialMyStats, params.category]);

  // 테이블의 초기 값
  const initialStats: SkillByTotalTypes = {
    ap: 0,
    hp: 0,
    mp: 0,
    sp: 0,
    str: 0,
    dex: 0,
    int: 0,
    will: 0,
    luck: 0,
    rp: 0,
  };

  // 누적 ap 계산
  const ap = sameTalentSkillLists.map(item => item.skill_by_total);

  ap.forEach(item => {
    for (const key in item) {
      if (initialStats.hasOwnProperty(key)) {
        initialStats[key as keyof SkillByTotalTypes] += item[key as keyof SkillByTotalTypes] as number;
      }
    }
  });
  // ----------------------------------------------------------------

  // initialStats와 myStats의 각 속성별 차이 계산
  const calculateDifference = (stats1: SkillByTotalTypes, stats2: SkillByTotalTypes) => {
    const difference: Partial<SkillByTotalTypes> = {};

    Object.keys(stats1).forEach(key => {
      const typedKey = key as keyof SkillByTotalTypes;
      difference[typedKey] = (stats2[typedKey] as number) - (stats1[typedKey] || 0);
    });

    return difference;
  };

  const difference = calculateDifference(myStats, initialStats);
  // ----------------------------------------------------------------

  return (
    <article className="grid grid-cols-2 gap-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {Object.entries(initialStats).map(([key, _]) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>총 합계</TableCell>
            {Object.entries(initialStats).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell>나의 합계</TableCell>
            {Object.entries(myStats).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell>차이</TableCell>
            {Object.entries(difference).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <Card>
        <CardHeader>
          <CardTitle className="text-[20px]">나의 재능 등급</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </article>
  );
}
