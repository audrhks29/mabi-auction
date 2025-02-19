import React, { useState } from "react";

type SetEffectType = {
  id: string;
  name: string;
  min_value: string;
  max_value: string;
};

export default function SetEffect({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [setEffectAmount, setSetEffectAmount] = useState("0");
  const [setEffectOption, setSetEffectOption] = useState<SetEffectType[]>([]);

  const handleSetValue = (newSetEffectOption: SetEffectType[], newSetEffectAmount: string) => {
    setSetEffectOption(newSetEffectOption);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions?.length === Number(newSetEffectAmount) &&
        newSetEffectOption.every(t =>
          matchingOptions.some(
            (opt: any) =>
              t.name !== "" &&
              opt.option_value.includes(t.name) &&
              Number(opt.option_value2) >= (Number(t.min_value) || 0) &&
              Number(opt.option_value2) <= (Number(t.max_value) || 10),
          ),
        )
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newSetEffectOption = setEffectOption.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newSetEffectOption, setEffectAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSetEffectAmount = e.target.value;
    setSetEffectAmount(newSetEffectAmount);
    handleSetValue(setEffectOption, newSetEffectAmount);
  };

  const handleRemove = (idx: number) => {
    const newSetEffectOption = [...setEffectOption.slice(0, idx), ...setEffectOption.slice(idx + 1)];
    handleSetValue(newSetEffectOption, setEffectAmount);
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">갯수</label>

        <select className="select w-full" onChange={handleAmountChange} required>
          <option value="">없음</option>
          {[1, 2, 3].map(num => (
            <option key={num} value={num}>
              {num}개
            </option>
          ))}
        </select>
      </div>

      {setEffectOption.map((item, idx) => {
        return (
          <React.Fragment key={item.id}>
            <div className="divider m-0 p-0"></div>

            <div className="flex gap-3">
              <label className="label w-16">명칭</label>

              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="명칭"
                onChange={e => handleChange(e, idx)}
              />
            </div>

            <div className="flex gap-3">
              <label className="label w-16">레벨</label>

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
                  placeholder="25"
                  onChange={e => handleChange(e, idx)}
                />
              </div>
            </div>

            <button type="button" className="btn btn-outline btn-primary" onClick={() => handleRemove(idx)}>
              세트 효과 삭제
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="btn btn-outline btn-primary"
        onClick={() => {
          setEffectOption.length !== 3
            ? setSetEffectOption(prev => [
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
        세트 효과 추가
      </button>
    </>
  );
}
