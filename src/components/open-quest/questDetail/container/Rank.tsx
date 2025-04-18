import { FetchingData, NonData } from "@/components/shared/DataState";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Rank({ rank }: { rank: HallOfFameTypes[] }) {
  return (
    <article>
      <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">랭크</h4>

      <Separator className="mb-3" />

      <Container rank={rank} />
    </article>
  );
}

function Container({ rank }: { rank: HallOfFameTypes[] }) {
  if (rank.length === 0) return <NonData cn="h-[300px]" text="랭킹정보가 없습니다." />;
  return <TableContainer rank={rank} />;
}

function TableContainer({ rank }: { rank: HallOfFameTypes[] }) {
  if (rank)
    return (
      <ScrollArea className="max-h-[500px] overflow-auto">
        <Table className="text-center">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>

          <TableHeader className="h-11">
            <TableRow>
              <TableHead>랭킹</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>달성시간</TableHead>
              <TableHead>좋아요</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rank.map((hall, index) => (
              <TableRow key={index} className="h-9 cursor-pointer">
                <TableCell className="font-bold">{hall.rank}</TableCell>
                <TableCell className="text-left">
                  [{hall.server_name}] {hall.character_name}
                </TableCell>
                <TableCell>{hall.complete_time} </TableCell>
                <TableCell>{hall.like_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    );
}
