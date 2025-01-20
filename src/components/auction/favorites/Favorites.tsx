// "use client";

// import { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Card } from "@/components/ui/card";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// import ItemDetail from "@/components/shared/auction/ui/ItemDetail";
// import Pagination from "@/components/shared/auction/ui/Pagination";

// import { columns } from "@/utils/favorites/tableColumns";

// import useUserDataStore from "@/store/userData-store";

// type SortingState = Array<{ id: string; desc: boolean }>;

// export default function Favorites() {
//   const userData = useUserDataStore(state => state.userData);

//   const [data, setData] = useState(userData?.favorites || []);
//   const [sorting, setSorting] = useState<SortingState>([]);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   return (
//     <Card className="p-3">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map(headerGroup => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>

//         <TableBody>
//           {table.getRowModel().rows.map(row => (
//             <Dialog key={row.id}>
//               <DialogTrigger asChild>
//                 <TableRow className="cursor-pointer">
//                   {row.getVisibleCells().map(cell => (
//                     <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                   ))}
//                 </TableRow>
//               </DialogTrigger>

//               <ItemDetail row={row} />
//             </Dialog>
//           ))}
//         </TableBody>
//       </Table>

//       <Pagination table={table} />
//     </Card>
//   );
// }
