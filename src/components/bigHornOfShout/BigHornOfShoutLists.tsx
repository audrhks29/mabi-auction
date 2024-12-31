import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UseFormGetValues } from "react-hook-form";

import useBigHornListsStore from "@/store/bigHornLists-store";

import convertToKoreanTime from "@/utils/convertToKoreanTime";

import NonData from "../shared/NonData";
import Loading from "../shared/Loading";

// 거뿔 테이블 렌더링 컴포넌트
function RenderContent({ renderData, isFetching }: { renderData: HornListTypes[] | []; isFetching: boolean }) {
  if (isFetching) {
    return (
      <tr className="border-b-0 h-[150px]">
        <td colSpan={3}>
          <Loading />
        </td>
      </tr>
    );
  }

  if (renderData && renderData.length > 0) {
    return (
      <React.Fragment>
        {renderData.map((item: HornListTypes) => (
          <tr key={uuidv4()} className="text-center hover:bg-base-200 cursor-pointer">
            <td>
              <div>
                {convertToKoreanTime(item.date_send).formattedDate}
                <br />
                {convertToKoreanTime(item.date_send).formattedTime}
              </div>
            </td>
            <td>{item.character_name}</td>
            <td className="text-left">{item.message}</td>
          </tr>
        ))}
      </React.Fragment>
    );
  } else {
    return (
      <tr className="border-b-0 h-[150px]">
        <td colSpan={3}>
          <NonData />
        </td>
      </tr>
    );
  }
}

export default function BigHornOfShoutLists({
  data,
  isFetching,
  getValues,
}: {
  data: HornListTypes[] | [];
  isFetching: boolean;
  getValues: UseFormGetValues<HornSearchFormTypes>;
}) {
  const filteredData = useBigHornListsStore(state => state.filteredData);
  const inputText = getValues().inputText;

  return (
    <section>
      <table className="table table-sm">
        <thead className="text-center">
          <tr>
            <th className="w-[160px]">날짜</th>
            <th className="w-[160px]">닉네임</th>
            <th className="w-[600px]">내용</th>
          </tr>
        </thead>

        <tbody>
          {inputText !== "" ? (
            <RenderContent renderData={filteredData} isFetching={isFetching} />
          ) : (
            <RenderContent renderData={data} isFetching={isFetching} />
          )}
        </tbody>
      </table>
    </section>
  );
}
