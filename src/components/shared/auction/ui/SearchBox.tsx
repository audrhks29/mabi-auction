import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

import searchLists from "@/assets/auction/searchLists.json";

import { useOutsideClickDropdownMenu } from "@/hooks/useOutsideClickDropdownMenu";
import { useHandleKeyDown } from "@/hooks/auction/actions/useHandleKeyDown";

import ItemCategories from "./category/ItemCategories";

import OptionModal from "./searchItemOption/OptionModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SearchBox({
  data,
  category,
  setCategory,
  handleSubmit,
  register,
  setValue,
}: {
  data: any;
  category: ItemCategoryStateTypes;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  handleSubmit: UseFormHandleSubmit<AuctionSearchFormTypes, undefined>;
  register: UseFormRegister<AuctionSearchFormTypes>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  const [recommendInputText, setRecommendInputText] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const filteredLists = searchLists.filter(list =>
    list.name.replace(/\s/g, "").includes(recommendInputText.replace(/\s/g, "")),
  );

  const onSubmit = (submitData: { inputText: string }) => {
    const selectedItemDetailCategory = searchLists.find(item => item.name.includes(submitData.inputText));

    if (selectedItemDetailCategory)
      setCategory({ category: null, detailCategory: selectedItemDetailCategory.detail_category });
  };

  // 추천 검색어 관련 -------------------------------------------------
  const searchRecommendRef = useRef<HTMLDivElement>(null!);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useOutsideClickDropdownMenu(searchRecommendRef, () => {
    setDropdownVisible(false);
    setSelectedIndex(null);
  });

  // 에니메이션
  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
      requestAnimationFrame(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
  }, [selectedIndex]);

  // 키다운 이벤트(추천검색어 이동)
  const handleKeyDown = useHandleKeyDown({
    isDropdownVisible,
    filteredLists,
    setSelectedIndex,
    setRecommendInputText,
    setValue,
    setDropdownVisible,
    selectedIndex,
  });
  // ----------------------------------------------------------------

  return (
    <section className="flex flex-col gap-2">
      <div className="w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="m-0 w-full flex md:hidden min-w-24 h-10 min-h-10 text-[12px] md:text-[14px] justify-center">
              카테고리
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[300px]">
            <DialogHeader>
              <DialogTitle>카테고리 선택</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <ItemCategories
              setCategory={setCategory}
              setValue={setValue}
              className="w-full h-[300px] overflow-y-auto"
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="h-10 min-h-10"
              onClick={e => {
                if (data?.length === 0 || data === undefined) {
                  alert("데이터를 검색하신 후 실행해주세요.");
                  e.preventDefault();
                }
              }}>
              옵션 선택
            </Button>
          </DialogTrigger>

          <OptionModal data={data} category={category} />
        </Dialog>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-1 justify-center">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="아이템 이름을 입력하세요."
                id="inputText"
                {...register("inputText")}
                className="w-full h-10 min-h-10"
                onChange={e => {
                  setRecommendInputText(e.target.value);
                  setDropdownVisible(e.target.value !== "");
                  setSelectedIndex(null);
                }}
                onKeyDown={handleKeyDown}
                onClick={() => setDropdownVisible(recommendInputText !== "")}
              />

              {/* 검색결과 추천 */}
              {isDropdownVisible && recommendInputText !== "" && (
                <div ref={searchRecommendRef} className="absolute w-full z-50 top-12 left-0 rounded-md">
                  <div className="max-h-[130px] overflow-y-scroll">
                    {filteredLists.map((filteredList, index) => (
                      <div
                        key={filteredList.id}
                        ref={el => {
                          itemRefs.current[index] = el;
                        }}
                        className={`indent-3 h-6 cursor-pointer ${
                          index === selectedIndex ? "bg-blue-200 font-bold" : "hover:font-bold"
                        }`}
                        onClick={() => {
                          setRecommendInputText(filteredList.name);
                          setValue("inputText", filteredList.name);
                          setDropdownVisible(false);
                          setSelectedIndex(null);
                        }}>
                        {filteredList.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="h-10 min-h-10">
              찾기
            </Button>

            <Button
              type="button"
              className="h-10 min-h-10"
              onClick={() => {
                setValue("inputText", "");
                setCategory({ category: null, detailCategory: null });
              }}>
              초기화
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
