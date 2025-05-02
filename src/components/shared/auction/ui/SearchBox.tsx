import { useState } from "react";
// import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { usePathname } from "next/navigation";

import useItemSearchStore from "@/store/itemSearch-store";

import itemCategoriesLists from "@/assets/auction/itemCategories.json";
import searchLists from "@/assets/auction/searchLists.json";

// import { useOutsideClickDropdownMenu } from "@/hooks/useOutsideClickDropdownMenu";
// import { useHandleKeyDown } from "@/hooks/auction/actions/useHandleKeyDown";

import ItemCategories from "./category/ItemCategories";
import CategoriesBadge from "./category/CategoriesBadge";
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
import { Separator } from "@/components/ui/separator";

export default function SearchBox({ data }: { data: AuctionTypes }) {
  const { setSubmitInputText, setSubmitSearchOption, setCategory, initialAll } = useItemSearchStore(state => ({
    setSubmitInputText: state.setSubmitInputText,
    setSubmitSearchOption: state.setSubmitSearchOption,
    setCategory: state.setCategory,
    initialAll: state.initialAll,
  }));

  const pathName = usePathname();
  const isHistoryPage = pathName.includes("history");

  const { register, handleSubmit, setValue } = useFormContext<AuctionSearchFormTypes>();

  // const [recommendInputText, setRecommendInputText] = useState("");
  // const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // const filteredLists = searchLists.filter(list =>
  //   list.name.replace(/\s/g, "").includes(recommendInputText.replace(/\s/g, "")),
  // );

  const onSubmit = (submitData: { inputText: string; searchOption: string }) => {
    setSubmitInputText(submitData.inputText);
    setSubmitSearchOption(submitData.searchOption);

    // 하위 카테고리 설정
    const selectedItemDetailCategory = searchLists.find(item => item.name === submitData.inputText);
    const matchedCategory = itemCategoriesLists.find(item =>
      item.detail_category.some(detail => detail.detail_category_name === selectedItemDetailCategory?.detail_category),
    );

    const categoryName = matchedCategory?.category_name;
    if (selectedItemDetailCategory && categoryName) {
      if (submitData.searchOption === "match") {
        setCategory(categoryName, selectedItemDetailCategory.detail_category);
      }
    }
  };

  // 추천 검색어 관련 -------------------------------------------------
  // const searchRecommendRef = useRef<HTMLDivElement>(null!);
  // const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useOutsideClickDropdownMenu(searchRecommendRef, () => {
  //   setDropdownVisible(false);
  //   setSelectedIndex(null);
  // });

  // 에니메이션
  // useEffect(() => {
  //   if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
  //     requestAnimationFrame(() => {
  //       itemRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  //     });
  //   }
  // }, [selectedIndex]);

  // 키다운 이벤트(추천검색어 이동)
  // const handleKeyDown = useHandleKeyDown({
  //   isDropdownVisible,
  //   filteredLists,
  //   setSelectedIndex,
  //   setRecommendInputText,
  //   setValue,
  //   setDropdownVisible,
  //   selectedIndex,
  // });
  // ----------------------------------------------------------------

  return (
    <section className="flex flex-col gap-1">
      <ItemCategoryDialog />

      <div className="flex gap-2">
        <OptionModalDialog data={data} />

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-1 justify-center">
            <select id="searchOption" defaultValue="match" className="w-[120px] min-h-10" {...register("searchOption")}>
              <option value="match">일치</option>
              {!isHistoryPage && <option value="keyword">키워드</option>}
            </select>

            <div className="relative w-full">
              <Input
                type="text"
                placeholder="아이템 이름을 입력하세요."
                id="inputText"
                {...register("inputText")}
                className="w-full h-10 min-h-10"
                // onChange={e => {
                //   setRecommendInputText(e.target.value);
                //   setDropdownVisible(e.target.value !== "");
                //   setSelectedIndex(null);
                // }}
                // onKeyDown={handleKeyDown}
                // onClick={() => setDropdownVisible(recommendInputText !== "")}
              />

              {/* 검색결과 추천
              {getValues().searchOption === "match" && isDropdownVisible && recommendInputText !== "" && (
                <div ref={searchRecommendRef} className="absolute border bg-card w-full z-50 top-12 left-0 rounded-xl">
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
              )} */}
            </div>

            <Button type="submit" className="h-10">
              찾기
            </Button>

            <Button
              type="button"
              className="h-10 min-h-10"
              onClick={() => {
                setValue("inputText", "");
                initialAll();
              }}>
              초기화
            </Button>
          </div>
        </form>
      </div>

      <Separator />

      <CategoriesBadge />

      <Separator />
    </section>
  );
}

function ItemCategoryDialog() {
  const [open, setOpen] = useState(false);

  return (
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

          <ItemCategories cn="w-full h-[300px] overflow-y-auto" setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OptionModalDialog({ data }: { data: AuctionTypes }) {
  const [open, setOpen] = useState(false);

  const { getValues } = useFormContext<AuctionSearchFormTypes>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        className="h-10 min-h-10"
        onClick={() => {
          if (
            data === null ||
            data?.auction_item?.length === 0 ||
            data?.auction_history?.length === 0 ||
            data === undefined
          ) {
            alert("데이터를 검색하신 후 실행해주세요.");
            return;
          }

          if (getValues().searchOption === "keyword") {
            alert("일치하는 검색만 옵션검색이 허용됩니다.");
            return;
          }

          setOpen(true);
        }}>
        옵션 선택
      </Button>

      <OptionModal data={data} />
    </Dialog>
  );
}
