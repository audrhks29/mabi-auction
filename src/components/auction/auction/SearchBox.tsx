import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import searchLists from "@/assets/auction/searchLists.json";

export default function SearchBox({
  category,
  setCategory,
  handleSubmit,
  register,
  setValue,
}: {
  category: ItemCategoryStateTypes;
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  handleSubmit: UseFormHandleSubmit<AuctionSearchFormTypes, undefined>;
  register: UseFormRegister<AuctionSearchFormTypes>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  const [recommendInputText, setRecommendInputText] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filteredLists = searchLists.filter(list =>
    list.name.replace(/\s/g, "").includes(recommendInputText.replace(/\s/g, "")),
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
      requestAnimationFrame(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      });
    }
  }, [selectedIndex]);

  const onSubmit = () => {
    setCategory({ category: null, detailCategory: null });
  };

  // 추천검색어 영역 밖 클릭
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
      setSelectedIndex(null);
    }
  };

  // 키다운 이벤트(추천검색어 이동)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownVisible || filteredLists.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex === null || prevIndex === filteredLists.length - 1 ? 0 : prevIndex + 1,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex === null || prevIndex === 0 ? filteredLists.length - 1 : prevIndex - 1,
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex !== null) {
          const selectedItem = filteredLists[selectedIndex];
          setRecommendInputText(selectedItem.name);
          setValue("inputText", selectedItem.name);
          setDropdownVisible(false);
          setSelectedIndex(null);
        }
        break;
      case "Escape":
        setDropdownVisible(false);
        setSelectedIndex(null);
        break;
    }
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
              setSelectedIndex(null);
            }}
            onKeyDown={handleKeyDown}
            onClick={() => setDropdownVisible(recommendInputText !== "")}
          />

          {/* 검색결과 추천 */}
          {isDropdownVisible && recommendInputText !== "" && (
            <div ref={dropdownRef} className="absolute top-11 left-0 w-[1096px] border rounded-md">
              <ScrollArea className="max-h-[130px] z-50 bg-slate-100">
                {filteredLists.map((filteredList, index) => (
                  <div
                    key={filteredList.id}
                    ref={el => {
                      itemRefs.current[index] = el;
                    }}
                    className={`indent-3 h-6 cursor-pointer ${
                      index === selectedIndex ? "bg-blue-200 font-semibold" : "hover:font-semibold"
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
              </ScrollArea>
            </div>
          )}

          <Button type="submit" className="w-[120px]">
            찾기
          </Button>
        </div>

        <div className="grid grid-cols-[auto_120px] gap-2 items-center">
          <div>
            {category.category && category.detailCategory ? (
              <span className="flex gap-2">
                <Badge variant={"outline"}>{category.category}</Badge>
                <Badge variant={"outline"}>{category.detailCategory}</Badge>
              </span>
            ) : (
              <Badge variant={"outline"}>카테고리 없음</Badge>
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
