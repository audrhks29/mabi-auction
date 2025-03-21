interface QuestListTypes {
  next_cursor: string;
  quest: QuestTypes[];
}

interface QuestTypes {
  challenge_state: string;
  challenger_count: number;
  creator_character_name: string;
  creator_server_name: string;
  image_url: string;
  like_count: number;
  quest_id: number;
  scope: string;
  tags: string;
  title: string;
}

interface QuestDetailTypes {
  error?: { name: string; name: string };
  quest_id: number;
  title: string;
  description: string;
  image_url: string;
  scope: string;
  challenge_period: string;
  creator_server_name: string;
  creator_character_name: string;
  challenger_count: number;
  like_count: number;
  liked: string;
  challenge_state: string;
  tags: string;
  mission: {
    description: string;
    goal: string;
    current: string;
  }[];
  hall_of_fame: {
    rank: number;
    server_name: string;
    character_name: string;
    complete_time: number;
    like_count: number;
    liked: string;
  }[];
}
