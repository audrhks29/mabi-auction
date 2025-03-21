import { useQuery } from "@tanstack/react-query";

export const useQuestLists = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["open-quest-quest"],
    queryFn: async () => {
      const response = await fetch(`/api/open-quest/quest`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch item lists");
      }
      return response.json();
    },
  });

  return { data, isFetching };
};
