import Image from "next/image";

import skillLists from "@/assets/skill/human.json";
import rankLists from "@/assets/rank.json";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SkillPage() {
  return (
    <main>
      <div className="inner">
        <h2>전체스킬입니다</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="w-[230px]">Name</TableHead>
              <TableHead className="w-[150px]">Rank</TableHead>
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
            {skillLists.map(skillList =>
              skillList.skills.map(skill => (
                <TableRow key={skill.skill_id}>
                  <TableCell>
                    <Image src={skill.icon} width={30} height={30} alt={skill.name_kor} className="m-auto" />
                  </TableCell>
                  <TableCell className="text-left">{skill.name_kor}</TableCell>

                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="연습" />
                      </SelectTrigger>
                      <SelectContent>
                        {rankLists.map(rankList => (
                          <SelectItem key={rankList.id} value={rankList.display}>
                            {rankList.display}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>{skill.skill_by_total.ap || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.hp || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.mp || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.sp || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.str || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.dex || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.int || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.will || 0}</TableCell>
                  <TableCell>{skill.skill_by_total.luck || 0}</TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
