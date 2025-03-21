import { useQuery } from "@tanstack/react-query";

export const useAuctionItemLists = (
  queryKey: string,
  type: string,
  inputText: string | null,
  detailCategory: string | null,
) => {
  const { data, isFetching } = useQuery({
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

  return { data, isFetching };
};
