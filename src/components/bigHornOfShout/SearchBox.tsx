import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  inputText: string;
}

export default function SearchBox({ setHornLists }) {
  const [searchType, setSearchType] = useState("keyword");
  const { handleSubmit, register, getValues, setValue, watch } = useForm<FormData>();

  const fetchHornLists = async () => {
    const inputText = getValues().inputText;

    try {
      const res = await fetch(`/api/bighornofshout?inputText=${encodeURIComponent(inputText)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();

      setHornLists(resData);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  const onSubmit = () => {
    fetchHornLists();
  };

  useLayoutEffect(() => {
    fetchHornLists();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-6 flex gap-2 max-w-[500px]">
      <Select value={searchType} onValueChange={value => setSearchType(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="keyword">키워드</SelectItem>
          <SelectItem value="nickName">닉네임</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="검색어를 입력해주세요." id="inputText" {...register("inputText", { required: true })} />
      <Button type="submit">검색</Button>
    </form>
  );
}
