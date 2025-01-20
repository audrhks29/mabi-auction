import { ColumnDef } from "@tanstack/react-table";

import convertToRemainingTime from "@/utils/convertToRemainingTime";

export const columns: ColumnDef<ItemListsTypes, any>[] = [
  {
    accessorKey: "date_send",
    header: "날짜",
    cell: props => <span className="ml-2">{props.getValue()}</span>,
  },
  {
    accessorKey: "character_name",
    header: "닉네임",
    cell: props => <p>{convertToRemainingTime(props.getValue())}</p>,
  },
  {
    accessorKey: "message",
    header: "내용",
    cell: props => <p>{props.getValue()}</p>,
  },
];
