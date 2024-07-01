export const calculateCumulativeStats = (findSkill: SkillsTypes, index: number) => {
  const cumulativeBonusStats = findSkill.skill_by_rank.slice(0, index + 1).reduce((acc: StatsTypes, rankInfo) => {
    const bonusStat = rankInfo.bonus_stats;
    if (bonusStat) {
      for (const [key, value] of Object.entries(bonusStat)) {
        if (key in acc) {
          acc[key as keyof StatsTypes] = (acc[key as keyof StatsTypes] || 0) + (value as number);
        } else {
          acc[key as keyof StatsTypes] = value as number;
        }
      }
    }
    return acc;
  }, {} as StatsTypes);

  return cumulativeBonusStats;
};

export const convertCumulativeStatsArray = (findSkill: SkillsTypes, index: number) => {
  // 누적 스탯 계산
  const cumulativeBonusStats = calculateCumulativeStats(findSkill, index);

  const entriesCumulativeStats = Object.entries(cumulativeBonusStats);
  const flatCumulativeStatsArray = entriesCumulativeStats.flatMap(([key, value]) => [key, value]);

  return flatCumulativeStatsArray;
};
