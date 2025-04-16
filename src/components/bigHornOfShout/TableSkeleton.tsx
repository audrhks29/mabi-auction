import React from "react";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <TableBody className="text-center">
      {[...Array(10)].map((_, index) => (
        <TableRow key={index}>
          {[2, 1, 1].map((count, countIndex) => (
            <TableCell key={countIndex}>
              {[...Array(count)].map((_, idx) => (
                <Skeleton key={idx} className="w-3/5 h-4 m-auto mt-1"></Skeleton>
              ))}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
