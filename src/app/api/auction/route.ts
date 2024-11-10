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
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?auction_item_category=${detailCategoryEncoded}`;
    } else {
      // 검색어 입력시 검색
      const inputTextEncoded = encodeURI(inputText as string);
      urlString = `https://open.api.nexon.com/mabinogi/v1/auction/list?item_name=${inputTextEncoded}`;
    }
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};
    let nextCursor: string | undefined = undefined;
    const data = [];

    try {
      do {
        const fetchUrl: string = nextCursor ? `${urlString}&cursor=${nextCursor}` : urlString;

        const res = await fetch(fetchUrl, { headers });
        const resData = await res.json();
        data.push(...resData.auction_item);

        nextCursor = resData.next_cursor;
      } while (nextCursor);

      data.sort((a, b) => a.auction_price_per_unit - b.auction_price_per_unit);
      return NextResponse.json(data);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  } else {
    return NextResponse.json({ data: [] });
  }
}
