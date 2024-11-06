// TODO: refactor

export default function Set({ setOptions }: { setOptions: ExtendedItemOptionTypes[] }) {
  return (
    setOptions.some(set => set.isDisplay) && (
      <article className="option-box">
        <h3 className="option-title">세트아이템</h3>

        {setOptions.map(options => {
          if (options?.option_value !== undefined) {
            return (
              <p key={options?.id}>
                {options?.option_value} {options?.option_value2} 증가
              </p>
            );
          }
        })}
      </article>
    )
  );
}
