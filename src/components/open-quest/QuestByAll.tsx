import { Dispatch, SetStateAction } from "react";

import QuestLists from "./QuestLists";

import categoryArray from "@/assets/open-quest/category.json";

import { useAllQuestLists } from "@/hooks/open-quest/useAllQuestLists";
export default function QuestByAll({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}) {
  const { data } = useAllQuestLists();

  return (
    <>
      {data?.map((arr, index) => {
        const slicedData = arr.data?.quest?.slice(0, 5);
        const matchCategory = categoryArray.find(item => item.id === index + 1);

        return (
          <div key={index} className="py-5">
            <div className="flex items-center justify-between pr-3">
              <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">
                {matchCategory?.text}
              </h4>
              {!(index === 0) && (
                <span
                  className="text-[12px] text-primary hover:underline cursor-pointer"
                  onClick={() => {
                    setCategory(matchCategory?.category as string);
                    window.scroll({ top: 0 });
                  }}>
                  + 더보기
                </span>
              )}
            </div>

            <div className="divider m-0 p-0 before:bg-primary after:bg-primary h-1"></div>

            <QuestLists data={slicedData} category={category} />
          </div>
        );
      })}
    </>
  );
}
