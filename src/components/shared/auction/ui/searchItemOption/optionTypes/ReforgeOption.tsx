import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ReforgeOptionType = {
  id: string;
  name: string;
  min_value: string;
  max_value: string;
};

export default function ReforgeOption({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [reforgeAmount, setReforgeAmount] = useState("0");
  const [reforgeOption, setReforgeOption] = useState<ReforgeOptionType[]>([]);

  const handleSetValue = (newReforgeOption: ReforgeOptionType[], newReforgeAmount: string) => {
    setReforgeOption(newReforgeOption);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions?.length === Number(newReforgeAmount) &&
        newReforgeOption.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.name !== "" &&
              opt.option_value.includes(t.name) &&
              Number(opt.option_value.match(/(\d+)\s*레벨/)[1]) >= (Number(t.min_value) || 0) &&
              Number(opt.option_value.match(/(\d+)\s*레벨/)[1]) <= (Number(t.max_value) || 25),
          ),
        )
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newReforgeOption = reforgeOption.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newReforgeOption, reforgeAmount);
  };

  const handleAmountChange = (value: string) => {
    setReforgeAmount(value);
    handleSetValue(reforgeOption, value);
  };

  const handleRemove = (idx: number) => {
    const newReforgeOption = [...reforgeOption.slice(0, idx), ...reforgeOption.slice(idx + 1)];
    handleSetValue(newReforgeOption, reforgeAmount);
  };

  return (
    <>
      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>갯수</Label>

        <Select onValueChange={value => handleAmountChange(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="없음" />
          </SelectTrigger>

          <SelectContent>
            {["1", "2", "3"].map(amount => (
              <SelectItem key={amount} value={amount}>
                {amount}개
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {reforgeOption.map((item, idx) => {
        return (
          <React.Fragment key={item.id}>
            <Separator />

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>명칭</Label>

              <Input type="text" name="name" placeholder="명칭" onChange={e => handleChange(e, idx)} />
            </div>

            <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
              <Label>레벨</Label>

              <div className="grid grid-cols-[1fr_30px_1fr] gap-3 items-center text-center">
                <Input type="text" name="min_value" placeholder="0" onChange={e => handleChange(e, idx)} />

                <span>~</span>

                <Input type="text" name="max_value" placeholder="25" onChange={e => handleChange(e, idx)} />
              </div>
            </div>

            <Button type="button" variant="outline" onClick={() => handleRemove(idx)}>
              세공 옵션 삭제
            </Button>
          </React.Fragment>
        );
      })}

      <Button
        type="button"
        onClick={() => {
          reforgeOption.length !== Number(reforgeAmount)
            ? setReforgeOption(prev => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  name: "",
                  min_value: "",
                  max_value: "",
                },
              ])
            : alert("옵션을 더 이상 추가할 수 없습니다.");
        }}>
        세공 옵션 추가
      </Button>
    </>
  );
}
