import React from "react";
import { usePathname } from "next/navigation";
import { flexRender, Row, Table } from "@tanstack/react-table";

import ItemDetailDialog from "@/components/shared/auction/ui/ItemDetailDialog";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DataTableBodyProps = {
  table: Table<ItemListsTypes> | Table<HornListTypes>;
};

export default function DataTableBody({ table }: DataTableBodyProps) {
  const pathName = usePathname();
  const isAuctionPage = pathName.includes("auction");

  return (
    <TableBody className="text-center">
      {table?.getRowModel()?.rows?.map(row => (
        <React.Fragment key={row.id}>
          <TableRow className="cursor-pointer">
            {row.getVisibleCells().map((cell: any) => (
              <Dialog key={cell.id}>
                <DialogTrigger asChild>
                  <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                </DialogTrigger>

                {isAuctionPage && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        {(row as Row<ItemListsTypes>).original.item_display_name}
                      </DialogTitle>
                      <DialogDescription className="hidden"></DialogDescription>
                    </DialogHeader>

                    <ItemDetailDialog row={row as Row<ItemListsTypes>} />
                  </DialogContent>
                )}
              </Dialog>
            ))}
          </TableRow>
        </React.Fragment>
      ))}
    </TableBody>
  );
}
