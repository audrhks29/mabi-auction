import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const useAuctionItemLists = (inputText: string | null, detailCategory: string | null) => {
  const pathName = usePathname();
  const queryKey = pathName.includes("auction/auction") ? "auction" : "history";
  const type = pathName.includes("auction/auction") ? "auction" : "history";

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
