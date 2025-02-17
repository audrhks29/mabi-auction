import React, { useState } from "react";

type ReforgeOptionType = {
  id: string;
  name: string;
  min_value: string;
  max_value: string;
};

export default function ReforgeOption({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [reforgeAmount, setReforgeAmount] = useState("0");
  const [reforgeOption, setReforgeOption] = useState<ReforgeOptionType[]>([]);
  console.log(reforgeAmount);

  const handleSetValue = (newReforgeOption: ReforgeOptionType[], newReforgeAmount: string) => {
    setReforgeOption(newReforgeOption);
    // console.log(reforgeOption);
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newReforgeAmount = e.target.value;
    setReforgeAmount(newReforgeAmount);
    handleSetValue(reforgeOption, newReforgeAmount);
  };

  const handleRemove = (idx: number) => {
    const newReforgeOption = [...reforgeOption.slice(0, idx), ...reforgeOption.slice(idx + 1)];
    handleSetValue(newReforgeOption, reforgeAmount);
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

      {reforgeOption.map((item, idx) => {
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
              세공 옵션 삭제
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="btn btn-outline btn-primary"
        onClick={() => {
          reforgeOption.length !== 3
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
      </button>
    </>
  );
}
