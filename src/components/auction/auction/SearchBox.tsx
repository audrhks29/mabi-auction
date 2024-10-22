import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import searchLists from "@/assets/auction/searchLists.json";
export default function SearchBox({
  category,
  setCategory,
  refetch,
  handleSubmit,
  register,
  getValues,
  setValue,
}: {
  category: ItemCategoryStateType;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateType>>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  handleSubmit: UseFormHandleSubmit<AuctionSearchFormTypes, undefined>;
  register: UseFormRegister<AuctionSearchFormTypes>;
  getValues: UseFormGetValues<AuctionSearchFormTypes>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  const [recommendInputText, setRecommendInputText] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = () => {
    setCategory({ category: null, detailCategory: null });
    refetch();
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-rows-2 gap-2 pb-2">
        <div className="relative grid grid-cols-[auto_120px] gap-2">
          <Input
            type="text"
            placeholder="아이템 이름을 입력하세요."
            id="inputText"
            {...register("inputText")}
            className="bg-slate-100"
            onChange={e => {
              setRecommendInputText(e.target.value);
              setDropdownVisible(e.target.value !== "");
            }}
            onClick={() => setDropdownVisible(recommendInputText !== "")}
          />

          {/* 검색결과 추천 */}
          {isDropdownVisible && recommendInputText !== "" && (
            <div ref={dropdownRef} className="absolute top-11 left-0 w-[1096px] border rounded-md">
              <ScrollArea className="max-h-[130px] z-50 bg-slate-100">
                {searchLists
                  .filter(
                    list => list.name.replace(/\s/g, "").includes(recommendInputText.replace(/\s/g, "")), // 공백 제거 후 필터링
                  )
                  .map(filteredList => (
                    <div
                      key={filteredList.id}
                      className="indent-3 h-6 hover:font-semibold cursor-pointer"
                      onClick={() => {
                        setRecommendInputText(filteredList.name);
                        setValue("inputText", filteredList.name);
                        setDropdownVisible(false);
                      }}>
                      {filteredList.name}
                    </div>
                  ))}
              </ScrollArea>
            </div>
          )}

          <Button type="submit" className="w-[120px]">
            찾기
          </Button>
        </div>

        <div className="grid grid-cols-[auto_120px] gap-2 items-center">
          <div>
            {category.category && category.detailCategory && (
              <span className="ml-3">
                {category.category} {">"} {category.detailCategory}
              </span>
            )}
          </div>

          <Button
            type="button"
            className="w-[120px]"
            onClick={() => {
              setValue("inputText", "");
              setCategory({ category: null, detailCategory: null });
            }}>
            검색 초기화
          </Button>
        </div>
      </form>
    </section>
  );
}
