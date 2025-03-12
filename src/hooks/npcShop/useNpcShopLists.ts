import { encodeServer } from "@/utils/serverMap";
import { useQuery } from "@tanstack/react-query";

export const useNpcShopLists = (params: { server: string }, npcName: string, channel: string) => {
  const encodedServerName = encodeServer(params);
  const encodedNpcName = encodeURI(npcName);

  const { data, isFetching } = useQuery({
    queryKey: [encodedServerName + "npcshop", encodedNpcName, channel],
    queryFn: async () => {
      if (encodedServerName !== undefined) {
        const response = await fetch(
          `/api/npc?npc_name=${encodedNpcName}&server=${encodedServerName}&channel=${channel}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
    select: data => {
      return data;
    },
  });

  return { data, isFetching };
};
