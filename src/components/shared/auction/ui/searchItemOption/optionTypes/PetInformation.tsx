import React, { useEffect, useState } from "react";

interface PetInformationType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function PetInformation({ option, index, setSelectedItemOptions }: PetInformationType) {
  const [petInfo, setPetInfo] = useState([
    {
      info_name: "",
      type: "",
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
          petInfo.every(t =>
            matchingOptions.some(
              (opt: any) =>
                t.info_name !== "" &&
                (t.info_name === "종족명"
                  ? opt.option_value.includes(t.type)
                  : t.info_name === opt.option_sub_type &&
                    opt.option_value >= (Number(t.min_value) || 0) &&
                    opt.option_value <= (Number(t.max_value) || 100000)),
            ),
          )
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petInfo]);

  const info = [
    "종족명",
    "펫 포인트",
    "레벨",
    "누적 레벨",
    "남은 분양 횟수",
    "나이",
    "생명력",
    "마나",
    "스태미나",
    "체력",
    "의지",
    "솜씨",
    "지력",
    "행운",
    "최대 소환 시간",
  ];

  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() =>
          setPetInfo(prev => [
            ...prev,
            {
              info_name: "",
              type: "",
              min_value: "",
              max_value: "",
            },
          ])
        }>
        추가
      </button>

      {petInfo.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <div className="flex gap-3">
              <label className="label w-16">능력</label>

              <select
                className="select w-full"
                onChange={e =>
                  setPetInfo(prev => prev.map((t, i) => (i === index ? { ...t, info_name: e.target.value } : t)))
                }>
                <option value="">없음</option>
                {info.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {petInfo[index].info_name === "종족명" ? (
              <div className="flex gap-3">
                <label className="label w-16">종족</label>

                <input
                  type="text"
                  className="input w-full"
                  onChange={e =>
                    setPetInfo(prev => prev.map((t, i) => (i === index ? { ...t, type: e.target.value } : t)))
                  }
                />
              </div>
            ) : (
              <div className="flex gap-3">
                <label className="label w-16">범위</label>

                <div className="flex gap-3 items-center justify-between w-full">
                  <input
                    type="text"
                    className="input w-32"
                    placeholder="최솟값"
                    onChange={e =>
                      setPetInfo(prev => prev.map((t, i) => (i === index ? { ...t, min_value: e.target.value } : t)))
                    }
                  />

                  <span>~</span>

                  <input
                    type="text"
                    className="input w-32"
                    placeholder="최댓값"
                    onChange={e =>
                      setPetInfo(prev => prev.map((t, i) => (i === index ? { ...t, max_value: e.target.value } : t)))
                    }
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
