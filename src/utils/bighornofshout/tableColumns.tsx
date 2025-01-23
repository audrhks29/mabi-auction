import { ColumnDef } from "@tanstack/react-table";

import convertToKoreanTime from "../convertToKoreanTime";

export const columns: ColumnDef<HornListTypes, any>[] = [
  {
    accessorKey: "date_send",
    header: "날짜",
    cell: props => (
      <p className="text-center w-[100px] max-w-[160px]">
        {convertToKoreanTime(props.getValue()).formattedDate}
        <br />
        {convertToKoreanTime(props.getValue()).formattedTime}
      </p>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "character_name",
    header: "닉네임",
    cell: props => <p className="text-center w-[100px] max-w-[160px]">{props.getValue()}</p>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "message",
    header: "내용",
    cell: props => <p className="max-w-[600px]">{props.getValue()}</p>,
    enableColumnFilter: true,
  },
];
