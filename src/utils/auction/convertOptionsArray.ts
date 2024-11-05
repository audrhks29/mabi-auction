export default function convertOptionsArray(options: ItemOptionTypes[]) {
  // 아이템 속성
  const attack = options?.find(option => option.option_type === "공격");
  const injury_rate = options?.find(option => option.option_type === "부상률");
  const critical = options?.find(option => option.option_type === "크리티컬");
  const balance = options?.find(option => option.option_type === "밸런스");
  const durability = options?.find(option => option.option_type === "내구력");
  const proficiency = options?.find(option => option.option_type === "숙련");
  const defensive = options?.find(option => option.option_type === "방어력");
  const safety = options?.find(option => option.option_type === "보호");
  const magicalDefensive = options?.find(option => option.option_type === "마법 방어력");
  const magicalSafety = options?.find(option => option.option_type === "마법 보호");

  // 인챈트 인지 판별
  const isEnchant = options?.some(option => option.option_type === "인챈트 종류");

  // 인챈트
  const enchant_head = options?.find(option => option?.option_sub_type === "접두");
  const enchant_tail = options?.find(option => option?.option_sub_type === "접미");
  const enchant_head_option = !isEnchant
    ? Array.isArray(enchant_head?.option_desc)
      ? enchant_head.option_desc
      : enchant_head?.option_desc
        ? enchant_head.option_desc.split(",")
        : []
    : [];
  const enchant_tail_option = !isEnchant
    ? Array.isArray(enchant_tail?.option_desc)
      ? enchant_tail.option_desc
      : enchant_tail?.option_desc
        ? enchant_tail.option_desc.split(",")
        : []
    : [];
  const canEnchant = options?.find(option => option?.option_sub_type === "인챈트 불가능");

  // 개조
  const general_modification = options?.find(option => option.option_type === "일반 개조");
  const gem_modification = options?.find(option => option.option_type === "보석 개조");
  const craftsman_modification = options?.find(option => option.option_type === "장인 개조");
  const special_modification = options?.find(option => option.option_type === "특별 개조");

  // 세공
  const reforge_rank = options?.find(option => option.option_type === "세공 랭크");
  const reforge_option1 = options?.find(option => option.option_type === "세공 옵션" && option.option_sub_type === "1");
  const reforge_option2 = options?.find(option => option.option_type === "세공 옵션" && option.option_sub_type === "2");
  const reforge_option3 = options?.find(option => option.option_type === "세공 옵션" && option.option_sub_type === "3");

  // 에르그
  const erg = options?.find(option => option.option_type === "에르그");

  // 세트 효과
  const setEffect1 = options?.find(option => option.option_type === "세트 효과" && option.option_sub_type === "1");
  const setEffect2 = options?.find(option => option.option_type === "세트 효과" && option.option_sub_type === "2");
  const setEffect3 = options?.find(option => option.option_type === "세트 효과" && option.option_sub_type === "3");
  const setEffect4 = options?.find(option => option.option_type === "세트 효과" && option.option_sub_type === "4");
  const setEffect5 = options?.find(option => option.option_type === "세트 효과" && option.option_sub_type === "5");

  // 아이템 색상
  const itemColor1 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 A",
  );
  const itemColor2 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 B",
  );
  const itemColor3 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 C",
  );
  const itemColor4 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 D",
  );
  const itemColor5 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 E",
  );
  const itemColor6 = options?.find(
    option => option.option_type === "아이템 색상" && option.option_sub_type === "파트 F",
  );

  // 전용 해제
  const unlock = options?.find(option => option.option_type === "남은 전용 해제 가능 횟수");

  // 아이템 보호
  const enchantProtect = options?.find(
    option => option.option_type === "아이템 보호" && option.option_value === "수리 실패",
  );

  // 인챈트 보호
  const repairProtect = options?.find(
    option => option.option_type === "아이템 보호" && option.option_value === "인챈트 실패",
  );

  // 피어싱 레벨
  const piercing = options?.find(option => option.option_type === "피어싱 레벨");

  const optionsArray = <ExtendedItemOptionTypes[]>[
    {
      id: 1,
      type: "attribute",
      option_type: "공격",
      option_value: attack?.option_value,
      option_value2: attack?.option_value2,
      isDisplay: Boolean(attack),
    },
    {
      id: 2,
      type: "attribute",
      option_type: "부상률",
      option_value: injury_rate?.option_value,
      option_value2: injury_rate?.option_value2,
      isDisplay: Boolean(injury_rate),
    },
    {
      id: 3,
      type: "attribute",
      option_type: "크리티컬",
      option_value: critical?.option_value,
      isDisplay: Boolean(critical),
    },
    {
      id: 4,
      type: "attribute",
      option_type: "밸런스",
      option_value: balance?.option_value,
      isDisplay: Boolean(balance),
    },
    {
      id: 5,
      type: "attribute",
      option_type: "방어력",
      option_value: defensive?.option_value,
      isDisplay: Boolean(defensive),
    },
    {
      id: 6,
      type: "attribute",
      option_type: "보호",
      option_value: safety?.option_value,
      option_value2: safety?.option_value2,
      isDisplay: Boolean(safety),
    },
    {
      id: 7,
      type: "attribute",
      option_type: "마법 방어력",
      option_value: magicalDefensive?.option_value,
      option_value2: magicalDefensive?.option_value2,
      isDisplay: Boolean(magicalDefensive),
    },
    {
      id: 8,
      option_type: "마법 보호",
      type: "attribute",
      option_value: magicalSafety?.option_value,
      option_value2: magicalSafety?.option_value2,
      isDisplay: Boolean(magicalSafety),
    },
    {
      id: 9,
      option_type: "내구력",
      type: "attribute",
      option_value: durability?.option_value,
      option_value2: durability?.option_value2,
      isDisplay: Boolean(durability),
    },
    {
      id: 10,
      option_type: "숙련",
      type: "attribute",
      option_value: proficiency?.option_value,
      isDisplay: Boolean(proficiency),
    },
    {
      id: 11,
      option_type: "인챈트",
      type: "enchant",
      option_sub_type: "접두",
      option_value: enchant_head?.option_value,
      option_desc: enchant_head_option,
      isDisplay: Boolean(enchant_head),
    },
    {
      id: 12,
      option_type: "인챈트",
      type: "enchant",
      option_sub_type: "접미",
      option_value: enchant_tail?.option_value,
      option_desc: enchant_tail_option,
      isDisplay: Boolean(enchant_tail),
    },
    {
      id: 13,
      option_type: "일반 개조",
      type: "modification",
      option_value: general_modification?.option_value,
      option_value2: general_modification?.option_value2,
      isDisplay: Boolean(general_modification),
    },
    {
      id: 14,
      option_type: "보석 개조",
      type: "modification",
      option_value: gem_modification?.option_value,
      isDisplay: Boolean(gem_modification),
    },
    {
      id: 15,
      option_type: "장인 개조",
      type: "modification",
      option_value:
        typeof craftsman_modification?.option_value === "string" && craftsman_modification?.option_value.split(","),
      isDisplay: Boolean(craftsman_modification),
    },
    {
      id: 16,
      option_type: "특별 개조",
      type: "modification",
      option_sub_type: special_modification?.option_sub_type,
      option_value: special_modification?.option_value,
      isDisplay: Boolean(special_modification),
    },
    {
      id: 17,
      option_type: "세공 랭크",
      type: "reforge",
      option_value: reforge_rank?.option_value,
      isDisplay: Boolean(reforge_rank),
    },
    {
      id: 18,
      option_type: "세공 옵션",
      type: "reforge",
      option_sub_type: "1",
      option_value: reforge_option1?.option_value,
      isDisplay: Boolean(reforge_option1),
    },
    {
      id: 19,
      option_type: "세공 옵션",
      type: "reforge",
      option_sub_type: "2",
      option_value: reforge_option2?.option_value,
      isDisplay: Boolean(reforge_option2),
    },
    {
      id: 20,
      option_type: "세공 옵션",
      type: "reforge",
      option_sub_type: "3",
      option_value: reforge_option3?.option_value,
      isDisplay: Boolean(reforge_option3),
    },
    {
      id: 21,
      option_type: "세트 효과",
      type: "set",
      option_sub_type: "1",
      option_value: setEffect1?.option_value,
      option_value2: setEffect1?.option_value2,
      isDisplay: Boolean(setEffect1),
    },
    {
      id: 22,
      option_type: "세트 효과",
      type: "set",
      option_sub_type: "2",
      option_value: setEffect2?.option_value,
      option_value2: setEffect2?.option_value2,
      isDisplay: Boolean(setEffect2),
    },
    {
      id: 23,
      option_type: "세트 효과",
      type: "set",
      option_sub_type: "3",
      option_value: setEffect3?.option_value,
      option_value2: setEffect3?.option_value2,
      isDisplay: Boolean(setEffect3),
    },
    {
      id: 24,
      option_type: "세트 효과",
      type: "set",
      option_sub_type: "4",
      option_value: setEffect4?.option_value,
      option_value2: setEffect4?.option_value2,
      isDisplay: Boolean(setEffect4),
    },
    {
      id: 24,
      option_type: "세트 효과",
      type: "set",
      option_sub_type: "5",
      option_value: setEffect5?.option_value,
      option_value2: setEffect5?.option_value2,
      isDisplay: Boolean(setEffect5),
    },
    {
      id: 25,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 A",
      option_value: itemColor1?.option_value,
      option_value2: itemColor1?.option_value2,
      option_desc: itemColor1?.option_desc,
      isDisplay: Boolean(itemColor1),
    },
    {
      id: 26,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 B",
      option_value: itemColor2?.option_value,
      option_value2: itemColor2?.option_value2,
      option_desc: itemColor2?.option_desc,
      isDisplay: Boolean(itemColor2),
    },
    {
      id: 27,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 C",
      option_value: itemColor3?.option_value,
      option_value2: itemColor3?.option_value2,
      option_desc: itemColor3?.option_desc,
      isDisplay: Boolean(itemColor3),
    },
    {
      id: 28,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 D",
      option_value: itemColor4?.option_value,
      option_value2: itemColor4?.option_value2,
      option_desc: itemColor4?.option_desc,
      isDisplay: Boolean(itemColor4),
    },
    {
      id: 29,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 E",
      option_value: itemColor5?.option_value,
      option_value2: itemColor5?.option_value2,
      option_desc: itemColor5?.option_desc,
      isDisplay: Boolean(itemColor5),
    },
    {
      id: 30,
      option_type: "아이템 색상",
      type: "color",
      option_sub_type: "파트 F",
      option_value: itemColor6?.option_value,
      option_value2: itemColor6?.option_value2,
      option_desc: itemColor6?.option_desc,
      isDisplay: Boolean(itemColor6),
    },
    {
      id: 31,
      type: "attribute",
      option_type: "남은 전용 해제 가능 횟수",
      option_value: unlock?.option_value,
      isDisplay: Boolean(unlock),
    },
    {
      id: 32,
      type: "enchant",
      option_type: "인챈트 불가능",
      option_value: canEnchant?.option_value,
      isDisplay: Boolean(canEnchant),
    },
    {
      id: 33,
      type: "attribute",
      option_type: "아이템 보호",
      option_value: enchantProtect?.option_value,
      isDisplay: Boolean(enchantProtect),
    },
    {
      id: 34,
      type: "attribute",
      option_type: "아이템 보호",
      option_value: repairProtect?.option_value,
      isDisplay: Boolean(repairProtect),
    },
    {
      id: 36,
      option_type: "에르그",
      type: "erg",
      option_sub_type: erg?.option_sub_type,
      option_value: erg?.option_value,
      option_value2: erg?.option_value2,
      isDisplay: Boolean(erg),
    },
    {
      id: 37,
      option_type: "피어싱 레벨",
      type: "attribute",
      option_value: piercing?.option_value,
      option_value2: piercing?.option_value2,
      isDisplay: Boolean(piercing),
    },
  ];

  return optionsArray;
}
