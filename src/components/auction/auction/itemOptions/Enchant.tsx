export default function Enchant({ enchantOptions }: { enchantOptions: ExtendedItemOptionTypes[] }) {
  const enchant_head = enchantOptions.find(option => option?.option_sub_type === "접두");
  const enchant_tail = enchantOptions.find(option => option?.option_sub_type === "접미");
  const canEnchant = enchantOptions.find(option => option?.option_sub_type === "인챈트 불가능");
  return (
    (enchant_head?.option_value || enchant_tail?.option_value) && (
      <div className="option-box">
        <h3 className="option-title">인챈트</h3>
        {canEnchant && (
          <div>
            <p className="text-red-600">인챈트를 부여할 수 없습니다.</p>
            <p className="text-red-600">스튜어트의 도움을 받아 복구할 수 있습니다.</p>
          </div>
        )}
        {Array.isArray(enchant_head?.option_desc) && enchant_head?.isDisplay && (
          <div>
            <p>[접두] {enchant_head?.option_value}</p>
            <div>{enchant_head.option_desc?.map(desc => <p key={desc}>{desc}</p>)}</div>
          </div>
        )}
        {Array.isArray(enchant_tail?.option_desc) && enchant_tail?.isDisplay && (
          <div className="mt-3">
            <p>[접미] {enchant_tail?.option_value}</p>
            <div>{enchant_tail.option_desc?.map(desc => <p key={desc}>{desc}</p>)}</div>
          </div>
        )}
      </div>
    )
  );
}
