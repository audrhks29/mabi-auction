interface UserDataTypes {
  user_id: string;
  user_password: string;
  server: string;
  race: string;
  nickname: string;
  skill_data?: {
    skill_id: number;
    talent: string[];
    talent_kor: string[];
    category: string;
    category_kor: string;
    rank: string;
    ap: number;
    hp: number;
    mp: number;
    sp: number;
    str: number;
    dex: 15;
    int: number;
    will: number;
    luck: number;
    rp: { title: string; exp: number }[];
    accumulate_ap: number;
  }[];
}
