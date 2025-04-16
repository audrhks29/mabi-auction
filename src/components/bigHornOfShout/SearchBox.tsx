import { Dispatch, useState } from "react";
import { UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { RotateCcw, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <Select defaultValue="message" onValueChange={value => setSearchType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="키워드 검색" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="message">키워드 검색</SelectItem>
            <SelectItem value="character_name">닉네임 검색</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="검색어를 입력해주세요."
          id="inputText"
          {...register("inputText")}
          className="w-full md:w-1/3 text-[12px] md:text-[14px]"
        />

        <Button type="submit">
          <i>
            <SearchIcon className="w-3 h-3" />
          </i>
        </Button>

        <Button
          type="button"
          className=""
          onClick={() => {
            setValue("inputText", "");
            setColumnFilters([]);
          }}>
          <i>
            <RotateCcw className="w-3 h-3" />
          </i>
        </Button>
      </form>
    </section>
  );
}
