import React, { useState } from "react";

type TotemType = {
  id: string;
  effect: string;
  min_value: string;
  max_value: string;
};

export default function TotemEffect({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [totem, setTotem] = useState([
    {
      id: crypto.randomUUID(),
      effect: "",
      min_value: "",
      max_value: "",
    },
  ]);

  const handleSetValue = (newTotem: TotemType[]) => {
    setTotem(newTotem);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newTotem.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.effect !== "" &&
              t.effect === opt.option_sub_type &&
              opt.option_value >= (Number(t.min_value) || 0) &&
              opt.option_value <= (Number(t.max_value) || 40),
          ),
        )
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newTotem = totem.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newTotem);
  };

  const handleRemove = (idx: number) => {
    const newTotem = [...totem.slice(0, idx), ...totem.slice(idx + 1)];
    handleSetValue(newTotem);
  };

  const optionArray = ["체력", "지력", "솜씨", "의지", "행운", "최대 생명력", "최대 스태미나", "최대 마나"];

  return (
    <>
      {totem.map((item, idx) => {
        const selectedEffects = totem.map(t => t.effect).filter(e => e !== "");

        return (
          <React.Fragment key={item.id}>
            <div className="divider m-0 p-0"></div>

            <div className="flex gap-3">
              <label className="label w-16">능력</label>

              <select name="effect" className="select w-full" onChange={e => handleChange(e, idx)} required>
                <option value="">없음</option>
                {optionArray
                  .filter(e => !selectedEffects.includes(e) || e === item.effect)
                  .map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex gap-3">
              <label className="label w-16">범위</label>

              <div className="flex gap-3 items-center justify-between w-full">
                <input
                  type="text"
                  name="min_value"
                  className="input w-32"
                  placeholder="0"
                  onChange={e => handleChange(e, idx)}
                />

                <span>~</span>

                <input
                  type="text"
                  name="max_value"
                  className="input w-32"
                  placeholder="40"
                  onChange={e => handleChange(e, idx)}
                />
              </div>
            </div>

            <button type="button" className="btn  btn-outline btn-primary" onClick={() => handleRemove(idx)}>
              토템 효과 삭제
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="btn btn-outline btn-primary"
        onClick={() => {
          totem.length !== 8
            ? setTotem(prev => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  effect: "",
                  min_value: "",
                  max_value: "",
                },
              ])
            : alert("조건을 더 이상 추가할 수 없습니다.");
        }}>
        토템 효과 추가
      </button>
    </>
  );
}
