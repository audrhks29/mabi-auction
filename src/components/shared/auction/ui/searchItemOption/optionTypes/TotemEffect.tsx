import React, { useEffect, useState } from "react";

interface TotemEffectType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function TotemEffect({ option, index, setSelectedItemOptions }: TotemEffectType) {
  const [totem, setTotem] = useState([
    {
      effect: "",
      min_value: "",
      max_value: "",
    },
  ]);

  useEffect(() => {
    setSelectedItemOptions(index, {
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);

        return (
          matchingOptions &&
          totem.every(t =>
            matchingOptions.some(
              (opt: any) =>
                t.effect !== "" &&
                t.effect === opt.option_sub_type &&
                opt.option_value >= (Number(t.min_value) || 0) &&
                opt.option_value <= (Number(t.max_value) || 40),
            ),
          )
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totem]);

  const effect = ["체력", "지력", "솜씨", "의지", "행운", "최대 생명력", "최대 스태미나", "최대 마나"];

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() =>
          setTotem(prev => [
            ...prev,
            {
              effect: "",
              min_value: "",
              max_value: "",
            },
          ])
        }>
        추가
      </button>

      {totem.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <div className="flex gap-3">
              <label className="label w-16">능력</label>

              <select
                className="select w-full"
                onChange={e =>
                  setTotem(prev => prev.map((t, i) => (i === index ? { ...t, effect: e.target.value } : t)))
                }>
                <option value="">없음</option>
                {effect.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <label className="label w-16">범위</label>

              <div className="flex gap-3 items-center justify-between w-full">
                <input
                  type="text"
                  className="input w-32"
                  placeholder="최솟값"
                  onChange={e =>
                    setTotem(prev => prev.map((t, i) => (i === index ? { ...t, min_value: e.target.value } : t)))
                  }
                />

                <span>~</span>

                <input
                  type="text"
                  className="input w-32"
                  placeholder="최댓값"
                  onChange={e =>
                    setTotem(prev => prev.map((t, i) => (i === index ? { ...t, max_value: e.target.value } : t)))
                  }
                />
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}
