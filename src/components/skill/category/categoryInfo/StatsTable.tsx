import { useParams } from "next/navigation";
import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import skillLists from "@/assets/skill/human/skill.json";

export default function StatsTable() {
  const params = useParams();
  const { myStats } = useCurrentCategoryInfoStore();

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
  };

  const sameTalentSkillLists: Array<{ skill_by_total: Partial<SkillByTotalTypes> }> = skillLists.filter(
    item => item.category === params.category,
  );

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
          {Object.entries(myStats).map(([key, value]) => {
            if (key !== "rp") return <TableCell key={key}>{value}</TableCell>;
          })}
        </TableRow>

        <TableRow>
          <TableCell>차이</TableCell>
          {Object.entries(difference).map(([key, value]) => {
            if (key !== "rp") return <TableCell key={key}>{value}</TableCell>;
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
}
