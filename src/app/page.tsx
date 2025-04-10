import Link from "next/link";

import noticeList from "@/assets/notice.json";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="inner">
      <h3 className="text-[18px] font-bold pb-6">업데이트 내역</h3>

      <Table className="text-[12px]">
        <colgroup>
          <col width="2%" />
          <col width="10%" />
          <col />
          <col width="10%" />
        </colgroup>

        <TableHeader>
          <TableRow>
            <TableHead>번호</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>작성일</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {noticeList
            .slice()
            .sort((a, b) => b.id - a.id)
            .map(notice => (
              <TableRow key={notice.id} className="text-center hover h-[60px]">
                <TableCell className="font-semibold">{notice.id}</TableCell>
                <TableCell>
                  <Badge className="badge badge-neutral">{notice.type}</Badge>
                </TableCell>
                <TableCell className="text-left hover:link font-semibold">
                  <Link href={`notice/${notice.id}`} className="hover:underline hover:underline-offset-4">
                    v{notice.version} 업데이트 내역
                  </Link>
                </TableCell>
                <TableCell>{notice.date.replace(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/, "$1.$2.$3")}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
}
