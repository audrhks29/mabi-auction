import { v4 as uuidv4 } from "uuid";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useBigHornListsStore from "@/store/bigHornLists-store";
import { UseFormGetValues } from "react-hook-form";

// 거뿔 테이블 렌더링 컴포넌트
function RenderContent({ renderData }: { renderData: hornListTypes[] | [] }) {
  // 날짜 한국시간으로 변환 함수
  const convertToKoreanTime = (isoString: string) => {
    const date = new Date(isoString);

    // 날짜 포맷팅
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "Asia/Seoul",
    };

    // 시간 포맷팅
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Seoul",
    };

    const formattedDate = new Intl.DateTimeFormat("ko-KR", dateOptions).format(date);
    const formattedTime = new Intl.DateTimeFormat("ko-KR", timeOptions).format(date);

    return (
      <div>
        {formattedDate}
        <br />
        {formattedTime}
      </div>
    );
  };

  return renderData?.map((item: hornListTypes) => (
    <TableRow key={uuidv4()}>
      <TableCell>{convertToKoreanTime(item.date_send)}</TableCell>
      <TableCell>{item.character_name}</TableCell>
      <TableCell className="text-left">{item.message}</TableCell>
    </TableRow>
  ));
}

export default function BigHornOfShoutLists({
  data,
  getValues,
}: {
  data: hornListTypes[] | [];
  getValues: UseFormGetValues<hornSearchFormTypes>;
}) {
  const filteredData = useBigHornListsStore(state => state.filteredData);
  const inputText = getValues().inputText;

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">날짜</TableHead>
            <TableHead className="w-[160px]">닉네임</TableHead>
            <TableHead className="w-[600px]">내용</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {inputText !== "" ? <RenderContent renderData={filteredData} /> : <RenderContent renderData={data} />}
        </TableBody>
      </Table>
    </section>
  );
}
