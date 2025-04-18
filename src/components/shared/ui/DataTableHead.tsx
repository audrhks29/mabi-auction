import { flexRender, Table } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DataTableHead({ table }: { table: Table<ItemListsTypes> | Table<HornListTypes> }) {
  return (
    <TableHeader>
      {table?.getHeaderGroups()?.map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <TableHead key={header.id} className="text-center">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
