import { useState } from "react";

export default function EcoStoneAwakeningAbility({ currentOptionType, index, setValue }: SearchOptionPropsTypes) {
  const [ecoStoneOption, setEcoStoneOption] = useState({
    awakeningAbility_name: "",
    min_level: "",
    max_level: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...ecoStoneOption, [name]: value };

    setEcoStoneOption(updated);

    setValue(`options.${index}.calcFunc`, (item: any) => {
      const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === currentOptionType);
      const extractNumbers = (val: string): number => Number(val.replace(/\D/g, ""));

      return matchingOptions?.some((opt: any) => {
        return (
          opt.option_value.includes(updated.awakeningAbility_name) &&
          extractNumbers(opt.option_value) >= Number(updated.min_level || 0) &&
          extractNumbers(opt.option_value) <= Number(updated.max_level || 20)
        );
      });
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">명칭</label>

        <input
          type="text"
          name="awakeningAbility_name"
          className="input w-full"
          placeholder="명칭"
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-3">
        <label className="label w-16">범위</label>

        <div className="flex items-center justify-between w-full">
          <input type="text" name="min_level" className="input w-32" placeholder="최소 레벨" onChange={handleChange} />

          <span>~</span>

          <input type="text" name="max_level" className="input w-32" placeholder="최대 레벨" onChange={handleChange} />
        </div>
      </div>
    </>
  );
}
