import { useQuery } from "@tanstack/react-query";

export const useQuestDetail = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["open-quest-detail", id],
    queryFn: async () => {
      const response = await fetch(`/api/open-quest/quest/detail?id=${id}`, {
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
