import { useFieldArray, useForm } from "react-hook-form";

import OptionIndex from "./optionTypes/OptionIndex";

import useItemOptionStore from "@/store/itemOption-store";

import itemOptionLists from "@/assets/auction/itemOptionLists.json";
import { useEffect, useState } from "react";

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

  const { register, control, handleSubmit, setValue, watch, reset } = useForm<SearchOptionFormTypes>({
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
    setSelectedItemOptions(value.options);
  };

  // 초기화
  useEffect(() => {
    reset();
    setSelectedItemOptions([]);
  }, [data, reset, setSelectedItemOptions]);

  return (
    <>
      <label
        htmlFor="search_option_modal"
        className="btn btn-neutral h-10 min-h-10 text-[12px] md:text-[14px]"
        onClick={e => {
          if (data?.length === 0 || data === undefined) {
            alert("데이터를 검색하신 후 실행해주세요.");
            e.preventDefault();
          }
        }}>
        옵션 선택
      </label>

      <input type="checkbox" id="search_option_modal" className="modal-toggle" />

      <form className="modal" role="dialog" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-box bg-base-200">
          <h3 className="text-lg font-bold text-center mb-3">옵션검색</h3>

          <div className="divider m-0 p-0"></div>

          {fields.map((field, index) => {
            const currentOptionType = watch(`options.${index}.option_type`);
            const selectedOptions = watch("options").map(opt => opt.option_type);

            return (
              <div key={field.id} className="border border-base-100 rounded-xl p-3 flex flex-col gap-3">
                <div className="flex gap-3">
                  <label className="label w-16">옵션</label>

                  <select className="select w-full" {...register(`options.${index}.option_type`)} required>
                    <option value="">옵션 타입 선택</option>

                    {searchableOptions
                      .filter(
                        optionList =>
                          !selectedOptions.includes(optionList.name) || optionList.name === currentOptionType,
                      )
                      .map(optionList => (
                        <option key={optionList.name} value={optionList.name}>
                          {optionList.displayName ? optionList.displayName : optionList.name}
                        </option>
                      ))}
                  </select>
                </div>

                {currentOptionType && (
                  <OptionIndex currentOptionType={currentOptionType} setValue={setValue} index={index} />
                )}

                <button type="button" className="btn btn-primary" onClick={() => remove(index)}>
                  옵션 삭제
                </button>
              </div>
            );
          })}

          <div className="divider m-0 p-0"></div>

          <div className="modal-action">
            <label htmlFor="search_option_modal" className="btn btn-neutral absolute top-4 right-6">
              닫기
            </label>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsFilter(false);
                reset();
              }}>
              초기화
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => append({ option_type: "", calcFunc: undefined })}>
              옵션 추가
            </button>

            <button
              type="submit"
              onClick={() => {
                setIsFilter(true);
                const modalCheckbox = document.getElementById("search_option_modal") as HTMLInputElement;
                if (modalCheckbox) modalCheckbox.checked = false;
              }}
              className="btn btn-primary">
              확인
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
