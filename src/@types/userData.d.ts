interface UserDataTypes {
  user_id?: string;
  user_password?: string;
  server?: string;
  race?: string;
  nickname?: string;
  skill_data?:
    | {
        skill_id: number;
        rank: string;
      }[]
    | null;
  favorites?: any[];
}
