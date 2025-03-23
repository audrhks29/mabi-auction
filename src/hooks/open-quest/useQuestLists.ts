import { useQuery } from "@tanstack/react-query";

export const useQuestLists = (category: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["open-quest-quest", category],
    queryFn: async () => {
      const response = await fetch(`/api/open-quest/quest?category=${category}`, {
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
