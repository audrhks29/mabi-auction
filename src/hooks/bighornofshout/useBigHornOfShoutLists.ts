import { useQuery } from "@tanstack/react-query";
import { encodeServer } from "@/utils/serverMap";

export const useBigHornOfShoutLists = (params: { server: string }) => {
  const encodedServerName = encodeServer(params);

  const { data, isFetching } = useQuery({
    queryKey: [encodedServerName + "bighornofshout"],
    queryFn: async () => {
      if (encodedServerName !== undefined) {
        const response = await fetch(`/api/bighornofshout?server=${encodedServerName}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
    select: data => {
      return data.horn_bugle_world_history;
    },
  });

  return { data, isFetching };
};
