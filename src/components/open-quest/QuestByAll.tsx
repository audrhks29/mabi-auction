import { Dispatch, SetStateAction } from "react";

import QuestLists from "./QuestLists";

import categoryArray from "@/assets/open-quest/category.json";

import { useAllQuestLists } from "@/hooks/open-quest/useAllQuestLists";

import { Separator } from "@/components/ui/separator";

export default function QuestByAll({ setCategory }: { setCategory: Dispatch<SetStateAction<string>> }) {
  const { data } = useAllQuestLists();

  return (
    <>
      {data.map((arr, index) => {
        const slicedData = arr.data?.quest?.slice(0, 5);
        const matchCategory = categoryArray.find(item => item.id === index + 2);

        return (
          <div key={index} className="py-5">
            <div className="flex items-center justify-between pr-3">
              <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold">
                {matchCategory?.text}
              </h4>

              {!(index === 0) && (
                <span
                  className="text-[12px] hover:underline text-primary/80 cursor-pointer"
                  onClick={() => {
                    setCategory(matchCategory?.category as string);
                    window.scroll({ top: 0 });
                  }}>
                  + 더보기
                </span>
              )}
            </div>

            <Separator />

            <QuestLists data={slicedData} />
          </div>
        );
      })}
    </>
  );
}
