import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UseFormGetValues } from "react-hook-form";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import useBigHornListsStore from "@/store/bigHornLists-store";

import convertToKoreanTime from "@/utils/convertToKoreanTime";

import NonData from "../shared/NonData";

// 거뿔 테이블 렌더링 컴포넌트
function RenderContent({ renderData, isLoading }: { renderData: HornListTypes[] | []; isLoading: boolean }) {
  return !isLoading && renderData && renderData.length > 0 ? (
    renderData?.map((item: HornListTypes) => (
      <TableRow key={uuidv4()}>
        <TableCell>
          <div>
            {convertToKoreanTime(item.date_send).formattedDate}
            <br />
            {convertToKoreanTime(item.date_send).formattedTime}
          </div>
        </TableCell>
        <TableCell>{item.character_name}</TableCell>
        <TableCell className="text-left">{item.message}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow className="border-b-0 h-[200px]">
      <TableCell colSpan={3}>
        <NonData />
      </TableCell>
    </TableRow>
  );
}

export default function BigHornOfShoutLists({
  data,
  isLoading,
  getValues,
}: {
  data: HornListTypes[] | [];
  isLoading: boolean;
  getValues: UseFormGetValues<HornSearchFormTypes>;
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
          {inputText !== "" ? (
            <RenderContent renderData={filteredData} isLoading={isLoading} />
          ) : (
            <RenderContent renderData={data} isLoading={isLoading} />
          )}
        </TableBody>
      </Table>
    </section>
  );
}
