import { useEffect, useState } from "react";

interface EcoStoneAwakeningAbilityType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function EcoStoneAwakeningAbility({
  option,
  index,
  setSelectedItemOptions,
}: EcoStoneAwakeningAbilityType) {
  const [ecoStoneOption, setEcoStoneOption] = useState({
    awakeningAbility_name: "",
    min_level: "",
    max_level: "",
  });

  useEffect(() => {
    setSelectedItemOptions(index, {
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        const extractNumbers = (value: string): number => Number(value.replace(/\D/g, ""));

        return matchingOptions?.some((opt: any) => {
          return (
            opt.option_value.includes(ecoStoneOption.awakeningAbility_name) &&
            extractNumbers(opt.option_value) >= Number(ecoStoneOption.min_level || 0) &&
            extractNumbers(opt.option_value) <= Number(ecoStoneOption.max_level || 20)
          );
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecoStoneOption, index, option.option_type]);

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">명칭</label>

        <input
          type="text"
          className="input w-full"
          placeholder="명칭"
          value={ecoStoneOption.awakeningAbility_name || ""}
          onChange={e => setEcoStoneOption({ ...ecoStoneOption, awakeningAbility_name: e.target.value })}
        />
      </div>

      <div className="flex gap-3">
        <label className="label w-16">범위</label>

        <div className="flex items-center justify-between w-full">
          <input
            type="text"
            className="input w-32"
            placeholder="최소 레벨"
            value={ecoStoneOption.min_level || ""}
            onChange={e => setEcoStoneOption({ ...ecoStoneOption, min_level: e.target.value })}
          />

          <span>~</span>

          <input
            type="text"
            className="input w-32"
            value={ecoStoneOption.max_level || ""}
            placeholder="최대 레벨"
            onChange={e => setEcoStoneOption({ ...ecoStoneOption, max_level: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}
