import { ArrowUpDownIcon } from "lucide-react";
import Image from "next/image";

export const columns = [
  {
    accessorKey: "textName1",
    header: ({ column }) => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">아이템</span>
        <button onClick={() => column.toggleSorting()}>
          <ArrowUpDownIcon className="w-4 h-4" />
        </button>
      </div>
    ),

    cell: props => {
      const rowData = props.row.original;

      return (
        <div className="flex items-center">
          <Image src={rowData.img} width={30} height={30} alt={rowData.textName1} />
          <span className="ml-2">{props.getValue()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div className="flex gap-3 align-middle justify-center items-center">
        <span className="font-bold cursor-pointer">남은 시간</span>
        <button onClick={() => column.toggleSorting()}>
          <ArrowUpDownIcon className="w-4 h-4" />
        </button>
      </div>
    ),
    cell: props => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "amount",
    header: "갯수",
    cell: props => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "cost",
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
          <p>개당 : {props.getValue().toLocaleString()} Gold</p>
          <p>전체 : {(props.getValue() * rowData.amount).toLocaleString()} Gold</p>
        </div>
      );
    },
  },
];
