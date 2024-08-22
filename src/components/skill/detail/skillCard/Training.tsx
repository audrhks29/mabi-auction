export default function Training({ rank }: { rank: SkillByRankTypes | undefined }) {
  return (
    <div className="border text-left text-[12px] p-3 rounded-sm">
      <h3 className="font-bold text-[14px] pb-3">수련방법</h3>

      {rank?.training_list?.map((training, index) => (
        <div key={index} className="grid grid-cols-[3fr_1fr]">
          <div className="flex">
            <p>*&nbsp;</p>
            <p>{training.title}</p>
          </div>

          <div className="flex justify-end">
            <p>
              +{training.training_exp}
              &nbsp;
            </p>
            <p>
              (0/
              {training.max_count})
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
