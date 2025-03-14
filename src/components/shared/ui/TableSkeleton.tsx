import React from "react";

interface TableSkeletonProps {
  rowCount?: number;
}

export default function TableSkeleton({ rowCount = 10 }: TableSkeletonProps) {
  const dummyMessage = {
    date: "2025. 3. 12.",
    time: "오후 4:38:43",
    nickName: "체가",
    content: "체가 : #[채널24] 새우잡이 느긋팟 각통 16릴 137국룰 예민x [1/8명]",
  };

  return (
    <tbody className="text-center">
      {Array.from({ length: rowCount }).map((_, index) => (
        <tr key={index} className="cursor-pointer hover:bg-base-200">
          <td>
            <p className="text-center w-[100px] max-w-[160px] mx-auto">
              <div className="bg-gray-500 dark:bg-gray-700 rounded animate-pulse mb-1">
                <p className="invisible">{dummyMessage.date}</p>
              </div>
              <div className="bg-gray-500 dark:bg-gray-700 rounded animate-pulse">
                <p className="invisible">{dummyMessage.time}</p>
              </div>
            </p>
          </td>
          <td>
            <p className="text-center w-[100px] max-w-[160px] mx-auto">
              <div className="bg-gray-500 dark:bg-gray-700 rounded animate-pulse">
                <p className="invisible">{dummyMessage.nickName}</p>
              </div>
            </p>
          </td>
          <td>
            <p className="max-w-[600px]">
              <div className="bg-gray-500 dark:bg-gray-700 rounded animate-pulse w-full relative">
                <p className="invisible">{dummyMessage.content}</p>
              </div>
            </p>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
