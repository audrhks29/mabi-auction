import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MoreOrLess({ watch, index, setValue }: SearchOptionPropsTypes) {
  const optionValue = watch(`options.${index}.option_value1`);
  const isMore = watch(`options.${index}.isMore`);

  return (
    <div className="grid grid-cols-[30px_1fr_60px] gap-3 items-center">
      <Label>값</Label>

      <Input
        type="text"
        defaultValue={optionValue}
        className="w-full"
        placeholder="값"
        onChange={e => {
          setValue(`options.${index}.option_value1`, e.target.value);
        }}
        required
      />

      <Button type="button" variant="outline" onClick={() => setValue(`options.${index}.isMore`, !isMore)}>
        {isMore ? "이상" : "이하"}
      </Button>
    </div>
  );
}
