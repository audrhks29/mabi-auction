import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import useItemOptionStore from "@/store/itemOption-store";

import itemOptionLists from "@/assets/auction/itemOptionLists.json";

import OptionIndex from "./optionTypes/OptionIndex";

import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type searchOptionType = {
  name: string;
  displayName: string | undefined;
};

export default function OptionModal({ data, category }: { data: any; category: ItemCategoryStateTypes }) {
  const [searchableOptions, setSearchableOptions] = useState<searchOptionType[]>([]);

  useEffect(() => {
    const findSearchOptions = (itemOptionLists: any[], category: ItemCategoryStateTypes) => {
      return itemOptionLists
        ?.filter(item => item.searchCategory.includes(category.detailCategory))
        .map(item => ({
          name: item.name,
          displayName: item.displayName,
        }));
    };

    const newSearchableOptions = findSearchOptions(itemOptionLists, category);

    setSearchableOptions(newSearchableOptions);
  }, [category]);

  const { control, handleSubmit, setValue, watch, reset } = useForm<SearchOptionFormTypes>({
    defaultValues: {
      options: [{ option_type: null, calcFunc: undefined }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });

  const { setSelectedItemOptions, setIsFilter } = useItemOptionStore(state => ({
    setSelectedItemOptions: state.setSelectedItemOptions,
    setIsFilter: state.setIsFilter,
  }));

  const onSubmit = (value: SearchOptionFormTypes) => {
    setIsFilter(true);
    setSelectedItemOptions(value.options);
  };

  // 초기화
  useEffect(() => {
    reset();
    setSelectedItemOptions([]);
  }, [data, reset, setSelectedItemOptions]);

  return (
    <DialogContent className="w-5/6">
      <DialogHeader>
        <DialogTitle className="text-center">옵션검색</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          {fields.map((field, index) => {
            const currentOptionType = watch(`options.${index}.option_type`);
            const selectedOptions = watch("options").map(opt => opt.option_type);

            return (
              <div key={field.id} className="grid gap-3">
                <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
                  <Label>옵션</Label>

                  <Select onValueChange={value => setValue(`options.${index}.option_type`, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="옵션 타입 선택" />
                    </SelectTrigger>

                    <SelectContent>
                      {searchableOptions
                        .filter(
                          optionList =>
                            !selectedOptions.includes(optionList.name) || optionList.name === currentOptionType,
                        )
                        .map(optionList => (
                          <SelectItem key={optionList.name} value={optionList.name}>
                            {optionList.displayName ? optionList.displayName : optionList.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentOptionType && (
                  <OptionIndex currentOptionType={currentOptionType} setValue={setValue} index={index} />
                )}

                <Button type="button" onClick={() => remove(index)}>
                  옵션 삭제
                </Button>
              </div>
            );
          })}

          <Separator />

          <div className="ml-auto flex gap-3">
            <DialogClose asChild>
              <Button type="button" className="absolute top-4 right-6">
                닫기
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={() => {
                setIsFilter(false);
                reset();
              }}>
              초기화
            </Button>

            <Button type="button" onClick={() => append({ option_type: "", calcFunc: undefined })}>
              옵션 추가
            </Button>

            <Button type="submit">확인</Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}
