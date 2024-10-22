import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDownIcon } from "lucide-react";

import convertToRemainingTime from "@/utils/convertToRemainingTime";
import convertToKoreanUnits from "@/utils/convertToKoreanUnits";

export const columns: ColumnDef<ItemListsTypes, any>[] = [
  {
    accessorKey: "item_display_name",
    header: ({ column }) => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">아이템</span>
        <button onClick={() => column.toggleSorting()}>
          <ArrowUpDownIcon className="w-4 h-4" />
        </button>
      </div>
    ),

    cell: props => <span className="ml-2">{props.getValue()}</span>,
  },
  {
    accessorKey: "date_auction_expire",
    header: ({ column }) => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">남은 시간</span>
        <button onClick={() => column.toggleSorting()}>
          <ArrowUpDownIcon className="w-4 h-4" />
        </button>
      </div>
    ),
    cell: props => <p>{convertToRemainingTime(props.getValue())}</p>,
  },
  {
    accessorKey: "item_count",
    header: "갯수",
    cell: props => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "auction_price_per_unit",
    header: ({ column }) => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">가격</span>
        <button onClick={() => column.toggleSorting()}>
          <ArrowUpDownIcon className="w-4 h-4" />
        </button>
      </div>
    ),
    cell: props => {
      const rowData = props.row.original;

      return (
        <div>
          <p>개당 : {convertToKoreanUnits(props.getValue())} Gold</p>
          <p>전체 : {convertToKoreanUnits(props.getValue() * rowData.item_count)} Gold</p>
        </div>
      );
    },
  },
];
