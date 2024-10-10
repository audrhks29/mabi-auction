import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function BigHornOfShoutLists({ hornLists }) {
  return (
    <section className="max-w-[900px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">날짜</TableHead>
            <TableHead className="w-[160px]">닉네임</TableHead>
            <TableHead>내용</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {hornLists.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.nick_name}</TableCell>
              <TableCell className="text-left">{item.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
