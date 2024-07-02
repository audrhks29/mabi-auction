import { useParams } from "next/navigation";
import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import skillLists from "@/assets/skill/human/skill.json";

export default function StatsTable() {
  const params = useParams();
  const { myStats, total_ap } = useCurrentCategoryInfoStore();

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
  // ----------------------------------------------------------------
  const skills = skillLists.filter(
    skillList =>
      (Array.isArray(params.category)
        ? params.category.includes(skillList.category)
        : skillList.category === params.category) ||
      (Array.isArray(params.category)
        ? params.category.some(cat => skillList.talent.includes(cat))
        : skillList.talent.includes(params.category)),
  );

  const calculateTotals = (skills: SkillsTypes[]) => {
    const ap = skills.reduce((sum, skill) => sum + skill.total_need_ap, 0);
    const stats = skills.reduce((acc, { total_stats = {} }) => {
      for (const [key, value] of Object.entries(total_stats)) {
        acc[key as keyof StatsTypes] = (acc[key as keyof StatsTypes] || 0) + value!;
      }
      return acc;
    }, {} as StatsTypes);

    return { ap, stats };
  };

  const total = calculateTotals(skills);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>ap</TableHead>
          {Object.entries(initialStats).map(([key, _]) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>총 합계</TableCell>
          <TableCell>{total.ap || 0}</TableCell>
          <TableCell>{total.stats.hp || 0}</TableCell>
          <TableCell>{total.stats.mp || 0}</TableCell>
          <TableCell>{total.stats.sp || 0}</TableCell>
          <TableCell>{total.stats.str || 0}</TableCell>
          <TableCell>{total.stats.dex || 0}</TableCell>
          <TableCell>{total.stats.int || 0}</TableCell>
          <TableCell>{total.stats.will || 0}</TableCell>
          <TableCell>{total.stats.luck || 0}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>나의 합계</TableCell>
          <TableCell>{total_ap || 0}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>차이</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
