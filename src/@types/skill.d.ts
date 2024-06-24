interface SkillsTypes {
  skill_id: number;
  talent: string[];
  talent_kor: string[];
  category: string;
  isPromotion: boolean;
  name_kor: string;
  icon: string;
  description: string;
  skill_by_total: SkillByTotalTypes;
  skill_by_rank: SkillByRankTypes[];
}
[];

interface SkillByTotalTypes extends StatsTypes {
  ap: number;
}

interface StatsTypes {
  hp?: number;
  mp?: number;
  sp?: number;
  str?: number;
  dex?: number;
  int?: number;
  will?: number;
  luck?: number;
}

interface SkillByRankTypes {
  rank: string;
  bonus_stat: StatsTypes | null;
  training_list: TrainingListTypes[];
  effect: string[];
  ap: number;
  rp: RpTypes[];
}

interface TrainingListTypes {
  title: string;
  training_exp: number;
  max_count: number;
}

interface RpTypes {
  skill_id?: number;
  title: string;
  exp: number;
}
