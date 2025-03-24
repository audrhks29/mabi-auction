import { useQueries, useQuery } from "@tanstack/react-query";
const categoryArray = [
  { id: 2, category: "CHALLENGE_COUNT", text: "최다 도전 퀘스트" },
  { id: 3, category: "LIKE_COUNT", text: "최다 좋아요 퀘스트" },
  { id: 4, category: "GM", text: "마비노기 GM 제작 퀘스트" },
  { id: 5, category: "NEWEST", text: "신작 퀘스트" },
  { id: 6, category: "GUILD", text: "길드 퀘스트" },
];
export const useAllQuestLists = () => {
  const data = useQueries({
    queries: categoryArray.map(key => ({
      queryKey: ["open-quest-quest", key.category],
      queryFn: async () => {
        const response = await fetch(`/api/open-quest/quest?category=${key.category}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      },
      combine: (results: { data: any; isPending: any }[]) => {
        return {
          data: results.map(result => result.data),
          pending: results.some(result => result.isPending),
        };
      },
    })),
  });
  return { data };
};
