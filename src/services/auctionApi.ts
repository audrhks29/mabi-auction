import { UseFormGetValues } from "react-hook-form";

export const fetchItemLists = async (
  getValues: UseFormGetValues<AuctionSearchFormTypes>,
  category: ItemCategoryStateType,
) => {
  const inputText = getValues().inputText;

  if (inputText !== "" || category.detailCategory) {
    let urlString;
    if (category.detailCategory) {
      // 카테고리 클릭시 검색
      const detailCategoryEncoded = encodeURI(category.detailCategory);
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?auction_item_category=${detailCategoryEncoded}`;
    } else {
      // 검색어 입력시 검색
      const inputTextEncoded = encodeURI(inputText);
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${inputTextEncoded}`;
    }

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    try {
      const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};

      const res = await fetch(urlString, {
        headers,
      });

      const resData = await res.json();
      return resData;
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  } else {
    return [];
  }
};
