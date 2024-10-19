import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useBigHornListsStore from "@/store/bigHornLists-store";
import { RotateCcw, SearchIcon } from "lucide-react";

export default function SearchBox({ data, refetch, handleSubmit, register, getValues, setValue }) {
  const [selectedServer, setSelectedServer] = useState(undefined);
  const [selectedSearchType, setSelectedSearchType] = useState("keyword");
  const setFilteredData = useBigHornListsStore(state => state.setFilteredData);

  const onSubmit = () => {
    const inputText = getValues().inputText;
    const searchType = getValues().searchType;

    if (searchType === "nickName") {
      const filteredData = data.filter((item: hornListTypes) => item.character_name === inputText);
      setFilteredData(filteredData);
    } else if (searchType === "keyword" || searchType === undefined) {
      const filteredData = data.filter((item: hornListTypes) => item.message.includes(inputText));

      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <section className="pt-6 flex gap-2 max-w-[950px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div>
          <Select
            value={selectedServer}
            onValueChange={value => {
              setSelectedServer(value);
              setValue("inputText", "");
              setValue(`serverType`, value);
            }}>
            <SelectTrigger className="w-[100px]" type="button">
              <SelectValue placeholder="서버" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="류트">류트</SelectItem>
              <SelectItem value="만돌린">만돌린</SelectItem>
              <SelectItem value="하프">하프</SelectItem>
              <SelectItem value="울프">울프</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={selectedSearchType}
            defaultValue="keyword"
            onValueChange={value => {
              setSelectedSearchType(value);
              setValue(`searchType`, value);
            }}>
            <SelectTrigger className="w-[150px]" type="button">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="keyword">키워드 검색</SelectItem>
              <SelectItem value="nickName">닉네임 검색</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input placeholder="검색어를 입력해주세요." id="inputText" {...register("inputText")} className="w-[200px]" />
        <Button type="submit">
          <i>
            <SearchIcon className="w-4 h-4" />
          </i>
        </Button>

        <Button
          type="button"
          onClick={() => {
            // if()
            setFilteredData([]);
            setValue(`inputText`, "");
          }}>
          전체보기
        </Button>

        <Button type="button" onClick={() => refetch()}>
          <i>
            <RotateCcw className="w-4 h-4" />
          </i>
        </Button>
      </form>
    </section>
  );
}
