import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const inputText = searchParams.get("inputText");
  const detailCategory = searchParams.get("detailCategory");

  let urlString;
  if (inputText !== "null" || detailCategory !== "null") {
    if (detailCategory !== "null") {
      // 카테고리 클릭시 검색
      const detailCategoryEncoded = encodeURI(detailCategory as string);
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/history?auction_item_category=${detailCategoryEncoded}`;
    } else {
      // 검색어 입력시 검색
      const inputTextEncoded = encodeURI(inputText as string);
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/history?item_name=${inputTextEncoded}`;
    }
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};
    let nextCursor: string | undefined = undefined;
    const data: { auction_history: any[]; error?: any[] } = { auction_history: [] };

    try {
      do {
        const fetchUrl: string = nextCursor ? `${urlString}&cursor=${nextCursor}` : urlString;

        const res = await fetch(fetchUrl, { headers });
        const resData = await res.json();
        data.auction_history.push(...resData.auction_history);

        nextCursor = resData.next_cursor;
      } while (nextCursor);

      data.auction_history.sort((a, b) => a.auction_price_per_unit - b.auction_price_per_unit);
      return NextResponse.json(data);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  } else {
    return NextResponse.json({ data: [] });
  }
}
