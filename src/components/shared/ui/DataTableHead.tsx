import { flexRender, Table } from "@tanstack/react-table";

export default function DataTableHead({ table }: { table: Table<ItemListsTypes> | Table<HornListTypes> }) {
  return (
    <thead>
      {table?.getHeaderGroups()?.map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <th key={header.id} className="text-center">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
