import { useQuery } from "@tanstack/react-query";

interface ItemHistoryParams {
  inputText: string | null;
  detailCategory: string | null;
}

export const useAuctionItemLists = (
  queryKey: string,
  type: string,
  inputText: string | null,
  detailCategory: string | null,
) => {
  return useQuery({
    queryKey: [queryKey, inputText || detailCategory || "NonData"],
    queryFn: async () => {
      if (!inputText && !detailCategory) return null;
      else {
        const response = await fetch(`/api/${type}?inputText=${inputText}&detailCategory=${detailCategory}`);
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }
    },
  });
};
