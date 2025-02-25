import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDownIcon } from "lucide-react";

import convertToRemainingTime from "@/utils/convertToRemainingTime";
import convertToKoreanUnits from "@/utils/convertToKoreanUnits";

export const columns = (updatedAuctionData: boolean[]): ColumnDef<ItemListsTypes, any>[] => [
  {
    accessorKey: "none_1",
    header: ({ table }) => (
      <input
        type="checkbox"
        onChange={e => table.toggleAllRowsSelected(e.target.checked)}
        checked={table.getIsAllRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
    ),
  },
  {
    accessorKey: "none_2",
    header: () => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">내 경매 현황</span>
      </div>
    ),

    cell: props => {
      const currentPropsIndex = props.cell.row.index;

      return <span className="ml-2">{updatedAuctionData[currentPropsIndex] ? "판매중" : "판매완료/삭제"}</span>;
    },
  },
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
