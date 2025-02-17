import React, { useEffect, useState } from "react";

type PetInfoType = {
  id: string;
  info_name: string;
  type: string;
  min_value: string;
  max_value: string;
};

export default function PetInformation({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [petInfo, setPetInfo] = useState<PetInfoType[]>([
    {
      id: crypto.randomUUID(),
      info_name: "",
      type: "",
      min_value: "",
      max_value: "",
    },
  ]);

  const handleSetValue = (newPetInfo: PetInfoType[]) => {
    setPetInfo(newPetInfo);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);

      return (
        matchingOptions &&
        newPetInfo.every(t =>
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
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, idx: number) => {
    const { name, value } = e.target;
    const newPetInfo = petInfo.map((t, i) => (i === idx ? { ...t, [name]: value } : t));
    handleSetValue(newPetInfo);
  };

  const handleRemove = (idx: number) => {
    const newPetInfo = [...petInfo.slice(0, idx), ...petInfo.slice(idx + 1)];
    handleSetValue(newPetInfo);
  };

  const optionArray = [
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
      {petInfo.map((info, idx) => {
        const selectedEffects = petInfo.map(t => t.info_name).filter(e => e !== "");

        return (
          <React.Fragment key={info.id}>
            <div className="flex gap-3">
              <label className="label w-16">능력</label>

              <select name="info_name" className="select w-full" onChange={e => handleChange(e, idx)} required>
                <option value="">없음</option>
                {optionArray
                  .filter(e => !selectedEffects.includes(e) || e === info.info_name)
                  .map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            {petInfo[index].info_name === "종족명" ? (
              <div className="flex gap-3">
                <label className="label w-16">종족</label>

                <input type="text" name="type" className="input w-full" onChange={e => handleChange(e, idx)} />
              </div>
            ) : (
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
                    placeholder="100000"
                    onChange={e => handleChange(e, idx)}
                  />
                </div>
              </div>
            )}

            <button type="button" className="btn  btn-outline btn-primary" onClick={() => handleRemove(idx)}>
              펫 옵션 삭제
            </button>
          </React.Fragment>
        );
      })}

      <button
        type="button"
        className="btn btn-outline btn-primary"
        onClick={() =>
          setPetInfo(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              info_name: "",
              type: "",
              min_value: "",
              max_value: "",
            },
          ])
        }>
        펫 옵션 추가
      </button>
    </>
  );
}
