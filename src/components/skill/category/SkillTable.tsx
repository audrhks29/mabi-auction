import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import skillLists from "@/assets/skill/human/skill.json";
import Image from "next/image";
import SelectRank from "./SelectRank";

export default function SkillTable({ params }: { params: { category: string } }) {
  const skill = skillLists.filter(
    skillList => skillList.category === params.category || skillList.talent.includes(params.category),
  );

  // console.log(skill);
  return (
    <article>
      <Table>
        <colgroup>
          <col width={80} />
          <col />
          <col width={120} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={90} />
          <col width={74} />
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[120px]">Rank</TableHead>
            <TableHead>ap</TableHead>
            <TableHead>hp</TableHead>
            <TableHead>mp</TableHead>
            <TableHead>sp</TableHead>
            <TableHead>str</TableHead>
            <TableHead>dex</TableHead>
            <TableHead>int</TableHead>
            <TableHead>will</TableHead>
            <TableHead>luck</TableHead>
            <TableHead>More</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {skill.map(skill => (
            <TableRow key={skill.skill_id} className="cursor-pointer">
              <TableCell>
                <Image src={skill.icon} width={30} height={30} alt={skill.name_kor} className="m-auto" />
              </TableCell>
              <TableCell className="text-left">{skill.name_kor}</TableCell>

              <SelectRank skill={skill} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
}
