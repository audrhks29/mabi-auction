import React, { useState } from "react";

type EnchantType = {
  id: string;
  type: "접두" | "접미" | string;
  name: string;
};

export default function Enchant({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [enchant, setEnchant] = useState<EnchantType[]>([
    {
      id: crypto.randomUUID(),
      type: "",
      name: "",
    },
  ]);

  const handleSetValue = (newEnchant: EnchantType[]) => {
    setEnchant(newEnchant);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newEnchant.every(t =>
          matchingOptions.some(
            (opt: any) => t.type !== "" && t.type === opt.option_sub_type && opt.option_value.includes(t.name),
          ),
        )
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newEnchant = enchant.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newEnchant);
  };

  const handleRemove = (idx: number) => {
    const newEnchant = [...enchant.slice(0, idx), ...enchant.slice(idx + 1)];
    handleSetValue(newEnchant);
  };

  const optionArray = ["접두", "접미"];

  return (
    <>
      {enchant.map((item, idx) => {
        const selectedEffects = enchant.map(t => t.type).filter(e => e !== "");

        return (
          <React.Fragment key={item.id}>
            <div className="divider m-0 p-0"></div>

            <div className="flex gap-3">
              <label className="label w-16">위치</label>

              <select name="type" className="select w-full" onChange={e => handleChange(e, idx)} required>
                <option value="">없음</option>
                {optionArray
                  .filter(e => !selectedEffects.includes(e) || e === item.type)
                  .map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-3">
              <label className="label w-16">명칭</label>

              <input
                type="text"
                className="input w-full"
                placeholder="인챈트 이름"
                name="name"
                onChange={e => handleChange(e, idx)}
                required
              />
            </div>

            {currentOptionType === "인챈트" && (
              <button type="button" className="btn  btn-outline btn-primary" onClick={() => handleRemove(idx)}>
                인챈트 삭제
              </button>
            )}
          </React.Fragment>
        );
      })}
      {currentOptionType === "인챈트" && (
        <button
          type="button"
          className="btn"
          onClick={() => {
            Enchant.length !== 2
              ? setEnchant(prev => [
                  ...prev,
                  {
                    id: crypto.randomUUID(),
                    type: "",
                    name: "",
                  },
                ])
              : alert("조건을 더 이상 추가할 수 없습니다.");
          }}>
          인챈트 추가
        </button>
      )}
    </>
  );
}
