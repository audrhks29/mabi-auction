interface HornTypes {
  horn_bugle_world_history: HornListTypes[];
  error?: { name: string };
}

interface HornListTypes {
  character_name: string;
  message: string;
  date_send: string;
}

interface HornSearchFormTypes {
  inputText: string;
  searchType: string | undefined;
  serverType: string;
}
