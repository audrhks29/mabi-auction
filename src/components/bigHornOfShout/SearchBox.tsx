import { Dispatch, useState } from "react";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { RotateCcw, SearchIcon } from "lucide-react";

export default function SearchBox({
  handleSubmit,
  register,
  getValues,
  setValue,
  setColumnFilters,
}: {
  handleSubmit: UseFormHandleSubmit<HornSearchFormTypes, undefined>;
  register: UseFormRegister<HornSearchFormTypes>;
  getValues: UseFormGetValues<HornSearchFormTypes>;
  setValue: UseFormSetValue<HornSearchFormTypes>;
  setColumnFilters: Dispatch<any>;
}) {
  const [searchType, setSearchType] = useState("message");

  const onSubmit = () => {
    const inputText = getValues().inputText;

    setColumnFilters([{ id: searchType, value: inputText }]);
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-1 w-full justify-center">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          className="select select-bordered text-[12px] md:text-[14px] pl-2 pr-7 md:pl-4 md:pr-10">
          <option value="message">키워드 검색</option>
          <option value="character_name">닉네임 검색</option>
        </select>

        <input
          placeholder="검색어를 입력해주세요."
          id="inputText"
          {...register("inputText")}
          className="input input-bordered bg-base-200 w-full md:w-1/3 text-[12px] md:text-[14px]"
        />

        <button type="submit" className="btn p-2 md:p-4">
          <i>
            <SearchIcon className="w-3 h-3" />
          </i>
        </button>

        <button
          type="button"
          className="hidden sm:btn p-2 md:p-4"
          onClick={() => {
            setValue("inputText", "");
            setColumnFilters([]);
          }}>
          <i>
            <RotateCcw className="w-3 h-3" />
          </i>
        </button>
      </form>
    </section>
  );
}
