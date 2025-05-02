import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const useAuctionItemLists = (inputText: string | null, detailCategory: string | null, searchOption: string) => {
  const pathName = usePathname();
  const type = pathName.includes("auction/auction") ? "auction" : "history";

  const { data, isFetching } = useQuery({
    queryKey: [type, searchOption, inputText, detailCategory],
    queryFn: async () => {
      if (searchOption === "keyword" && inputText) {
        const response = await fetch(
          `/api/auction/keyword-search?inputText=${inputText}&detailCategory=${detailCategory}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch item lists");
        }
        return response.json();
      }

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
