import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

import searchLists from "@/assets/auction/searchLists.json";
import ItemCategories from "./category/ItemCategories";
import { useOutsideClickDropdownMenu } from "@/hooks/outsideClick/useOutsideClickDropdownMenu";
import { useHandleKeyDown } from "@/hooks/handle/useHandleKeyDown";

export default function SearchBox({
  setCategory,
  handleSubmit,
  register,
  setValue,
}: {
  setCategory: Dispatch<SetStateAction<ItemCategoryStateTypes>>;
  handleSubmit: UseFormHandleSubmit<AuctionSearchFormTypes, undefined>;
  register: UseFormRegister<AuctionSearchFormTypes>;
  setValue: UseFormSetValue<AuctionSearchFormTypes>;
}) {
  const [recommendInputText, setRecommendInputText] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredLists = searchLists.filter(list =>
    list.name.replace(/\s/g, "").includes(recommendInputText.replace(/\s/g, "")),
  );

  const onSubmit = () => {
    setCategory({ category: null, detailCategory: null });
  };

  // 추천 검색어 관련 -------------------------------------------------
  const searchRecommendRef = useRef<HTMLDivElement>(null);
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

  // 드롭다운 메뉴 관련 이벤트(모바일)
  const [isCategoriesVisible, setCategoriesVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCategoriesVisibility = () => {
    setCategoriesVisible(prev => !prev);
  };

  useOutsideClickDropdownMenu(dropdownRef, () => setCategoriesVisible(false));
  // ----------------------------------------------------------------

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="dropdown" ref={dropdownRef}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleCategoriesVisibility}
            className="btn btn-neutral m-0 flex lg:hidden min-w-24 h-10 min-h-10 text-[12px] md:text-[14px] justify-center">
            카테고리
          </div>

          {isCategoriesVisible && (
            <ItemCategories
              setCategory={setCategory}
              setValue={setValue}
              className="dropdown-content z-[1] w-52 h-[300px]"
              toggleCategoriesVisibility={toggleCategoriesVisibility}
            />
          )}
        </div>

        <div className="flex gap-1 justify-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="아이템 이름을 입력하세요."
              id="inputText"
              {...register("inputText")}
              className="input input-bordered bg-base-200 w-full h-10 min-h-10 text-[12px] md:text-[14px]"
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
              <div
                ref={searchRecommendRef}
                className="absolute w-full z-50 top-14 left-0 border rounded-md text-[12px] md:text-[14px]">
                <div className="max-h-[130px] bg-base-200 overflow-y-scroll">
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

          <button type="submit" className="btn btn-neutral h-10 min-h-10 text-[12px] md:text-[14px]">
            찾기
          </button>

          <button
            type="button"
            className="btn btn-neutral h-10 min-h-10 text-[12px] md:text-[14px]"
            onClick={() => {
              setValue("inputText", "");
              setCategory({ category: null, detailCategory: null });
            }}>
            초기화
          </button>
        </div>
      </form>
    </section>
  );
}
