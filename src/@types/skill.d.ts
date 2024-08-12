interface SkillsTypes {
  skill_id: number;
  talent: string[];
  talent_kor: string[];
  category: string;
  isPromotion: boolean;
  name_kor: string;
  icon: string;
  description: string;
  total_need_ap: number;
  total_stats: StatsTypes;
  skill_by_rank: SkillByRankTypes[];
}
[];

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

interface StatsIncludeIdTypes extends StatsTypes {
  id?: number;
}

interface SkillByRankTypes {
  rank: string;
  bonus_stats: StatsTypes | null;
  training_list: TrainingListTypes[];
  effect: string[];
  need_ap: number;
  accumulate_rp: RpTypes[] | null;
  accumulate_stats: StatsTypes | null;
  accumulate_ap: number;
}

interface TrainingListTypes {
  title: string;
  training_exp: number;
  max_count: number;
}

interface RpTypes {
  title: string;
  exp: number;
}
