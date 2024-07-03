import { useParams } from "next/navigation";
import useCurrentCategoryInfoStore from "@/store/CurrentCategoryInfo-store";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import skillLists from "@/assets/skill/human/skill.json";

export default function StatsTable() {
  const params = useParams();
  const { total_ap, total_stats } = useCurrentCategoryInfoStore();

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
          <TableCell>{total_stats.hp || 0}</TableCell>
          <TableCell>{total_stats.mp || 0}</TableCell>
          <TableCell>{total_stats.sp || 0}</TableCell>
          <TableCell>{total_stats.str || 0}</TableCell>
          <TableCell>{total_stats.dex || 0}</TableCell>
          <TableCell>{total_stats.int || 0}</TableCell>
          <TableCell>{total_stats.will || 0}</TableCell>
          <TableCell>{total_stats.luck || 0}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>차이</TableCell>
          <TableCell>{(total.ap || 0) - (total_ap || 0)}</TableCell>
          <TableCell>{(total.stats.hp || 0) - (total_stats.hp || 0)}</TableCell>
          <TableCell>{(total.stats.mp || 0) - (total_stats.mp || 0)}</TableCell>
          <TableCell>{(total.stats.sp || 0) - (total_stats.sp || 0)}</TableCell>
          <TableCell>{(total.stats.str || 0) - (total_stats.str || 0)}</TableCell>
          <TableCell>{(total.stats.dex || 0) - (total_stats.dex || 0)}</TableCell>
          <TableCell>{(total.stats.int || 0) - (total_stats.int || 0)}</TableCell>
          <TableCell>{(total.stats.will || 0) - (total_stats.will || 0)}</TableCell>
          <TableCell>{(total.stats.luck || 0) - (total_stats.luck || 0)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
