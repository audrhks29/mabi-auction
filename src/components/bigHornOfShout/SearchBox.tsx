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
  const [selectedServer, setSelectedServer] = useState<string | undefined>(undefined);
  const [selectedSearchType, setSelectedSearchType] = useState("keyword");
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
    <section className="pt-6 flex gap-2 max-w-[950px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <select
          value={selectedServer}
          onChange={e => {
            if (typeof e.target.value === "string") {
              setSelectedServer(e.target.value);
              setValue("inputText", "");
              setValue(`serverType`, e.target.value);
            }
          }}
          className="select select-bordered">
          <option value="류트">류트</option>
          <option value="만돌린">만돌린</option>
          <option value="하프">하프</option>
          <option value="울프">울프</option>
        </select>

        <select
          value={selectedSearchType}
          defaultValue="keyword"
          onChange={e => {
            setSelectedSearchType(e.target.value);
            setValue(`searchType`, e.target.value);
          }}
          className="select select-bordered">
          <option value="keyword">키워드 검색</option>
          <option value="nickName">닉네임 검색</option>
        </select>

        <input
          placeholder="검색어를 입력해주세요."
          id="inputText"
          {...register("inputText")}
          className="input input-bordered bg-base-200 w-[200px]"
        />
        <button type="submit" className="btn">
          <i>
            <SearchIcon className="w-4 h-4" />
          </i>
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setFilteredData([]);
            setValue(`inputText`, "");
          }}>
          전체보기
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setValue("inputText", "");
          }}>
          <i>
            <RotateCcw className="w-4 h-4" />
          </i>
        </button>
      </form>
    </section>
  );
}
