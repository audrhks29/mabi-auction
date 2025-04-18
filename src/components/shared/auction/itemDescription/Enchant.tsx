// TODO: refactor

import { Badge } from "@/components/ui/badge";

export default function Enchant({ enchantOptions }: { enchantOptions: ExtendedItemOptionTypes[] }) {
  const enchant_head = enchantOptions.find(option => option?.option_sub_type === "접두");
  const enchant_tail = enchantOptions.find(option => option?.option_sub_type === "접미");
  const canEnchant = enchantOptions.find(option => option?.option_sub_type === "인챈트 불가능");

  return (
    enchantOptions.some(enchant => enchant.isDisplay) && (
      <fieldset className="border rounded-2xl">
        <legend className="ml-3">
          <Badge variant="secondary" className="border border-border shadow-lg">
            인챈트
          </Badge>
        </legend>

        <ul className="py-1 px-3 text-card-foreground/90">
          {canEnchant && (
            <li>
              <p className="text-red-600">인챈트를 부여할 수 없습니다.</p>
              <p className="text-red-600">스튜어트의 도움을 받아 복구할 수 있습니다.</p>
            </li>
          )}

          {Array.isArray(enchant_head?.option_desc) && enchant_head?.isDisplay && (
            <li>
              <p className="font-bold">
                <b>[접두] {enchant_head?.option_value}</b>
              </p>
              <div>{enchant_head.option_desc?.map(desc => <p key={desc}>{desc}</p>)}</div>
            </li>
          )}

          {Array.isArray(enchant_tail?.option_desc) && enchant_tail?.isDisplay && (
            <li className={`${enchant_head?.option_value ? "mt-3" : ""}`}>
              <p className="font-bold">
                <b>[접미] {enchant_tail?.option_value}</b>
              </p>
              <div>{enchant_tail.option_desc?.map(desc => <p key={desc}>{desc}</p>)}</div>
            </li>
          )}
        </ul>
      </fieldset>
    )
  );
}
