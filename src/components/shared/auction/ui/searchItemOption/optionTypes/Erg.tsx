interface ErgType {
  option: OptionTypes;
  index: number;
  setSelectedItemOptions: (index: number, newOption: Partial<OptionTypes>) => void;
}

export default function Erg({ option, index, setSelectedItemOptions }: ErgType) {
  const handleGradeChange = (grade: string) => {
    setSelectedItemOptions(index, {
      option_sub_type: grade,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some((opt: any) => opt.option_sub_type === grade);
      },
    });
  };

  const handleLevelChange = (level: string) => {
    setSelectedItemOptions(index, {
      option_value: level,
      calcFunc: (item: any) => {
        const matchingOptions = item?.item_option?.filter((opt: any) => opt.option_type === option.option_type);
        return matchingOptions?.some(
          (opt: any) => opt.option_sub_type === option.option_sub_type && Number(opt.option_value) === Number(level),
        );
      },
    });
  };

  return (
    <>
      <div className="flex gap-3">
        <label className="label w-16">등급</label>

        <select className="select w-full" onChange={e => handleGradeChange(e.target.value)}>
          <option value="">없음</option>
          <option value="S">S 등급</option>
          <option value="A">A 등급</option>
          <option value="B">B 등급</option>
        </select>
      </div>

      {option.option_sub_type && (
        <div className="flex gap-3">
          <label className="label w-16">등급</label>
          <input
            type="text"
            className="input w-full"
            placeholder="레벨"
            value={option.option_value || ""}
            onChange={e => handleLevelChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
}
