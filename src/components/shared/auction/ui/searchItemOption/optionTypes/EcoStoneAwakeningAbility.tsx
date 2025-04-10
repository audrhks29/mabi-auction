import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>명칭</Label>

        <Input type="text" name="awakeningAbility_name" placeholder="명칭" onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-[30px_1fr] gap-3 items-center">
        <Label>범위</Label>

        <div className="grid grid-cols-[1fr_30px_1fr] gap-3 items-center text-center">
          <Input type="text" name="min_level" placeholder="최소 레벨" onChange={handleChange} />

          <span>~</span>

          <Input type="text" name="max_level" placeholder="최대 레벨" onChange={handleChange} />
        </div>
      </div>
    </>
  );
}
