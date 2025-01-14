import { useState } from "react";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";

import useBigHornListsStore from "@/store/bigHornLists-store";

import { RotateCcw, SearchIcon } from "lucide-react";

export default function SearchBox({
  data,
  handleSubmit,
  register,
  getValues,
  setValue,
}: {
  data: HornListTypes[];
  handleSubmit: UseFormHandleSubmit<HornSearchFormTypes, undefined>;
  register: UseFormRegister<HornSearchFormTypes>;
  getValues: UseFormGetValues<HornSearchFormTypes>;
  setValue: UseFormSetValue<HornSearchFormTypes>;
}) {
  const setFilteredData = useBigHornListsStore(state => state.setFilteredData);

  const onSubmit = () => {
    const inputText = getValues().inputText;
    const searchType = getValues().searchType;

    // 닉네임 검색
    if (searchType === "nickName") {
      const filteredData = data.filter((item: HornListTypes) => item.character_name === inputText);
      setFilteredData(filteredData);
    }

    // 키워드 검색
    else if (searchType === "keyword" || searchType === undefined) {
      const filteredData = data.filter((item: HornListTypes) => item.message.includes(inputText));
      setFilteredData(filteredData);
    }

    // 전체 검색,
    else {
      setFilteredData(data);
    }
  };

  return (
    <section className="flex gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-1">
        <select
          defaultValue="keyword"
          onChange={e => setValue(`searchType`, e.target.value)}
          className="select select-bordered text-[12px] md:text-[14px] pl-2 pr-7 md:pl-4 md:pr-10">
          <option value="keyword">키워드 검색</option>
          <option value="nickName">닉네임 검색</option>
        </select>

        <input
          placeholder="검색어를 입력해주세요."
          id="inputText"
          {...register("inputText")}
          className="input input-bordered bg-base-200 text-[12px] md:text-[14px]"
        />

        <button type="submit" className="btn p-2 md:p-4">
          <i>
            <SearchIcon className="w-3 h-3" />
          </i>
        </button>

        <button
          type="button"
          className="btn p-2 md:p-4 text-[12px] md:text-[14px]"
          onClick={() => {
            setFilteredData([]);
            setValue(`inputText`, "");
          }}>
          전체보기
        </button>

        <button
          type="button"
          className="btn p-2 md:p-4"
          onClick={() => {
            setValue("inputText", "");
          }}>
          <i>
            <RotateCcw className="w-3 h-3" />
          </i>
        </button>
      </form>
    </section>
  );
}
