import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const inputText = searchParams.get("inputText");
  const detailCategory = searchParams.get("detailCategory");
  const inputTextEncoded = encodeURI(inputText as string);

  const urlString = `https://open.api.nexon.com/mabinogi/v1/auction/keyword-search?keyword=${inputTextEncoded};`;
  if (inputText !== "null") {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};
    let nextCursor: string | undefined = undefined;
    const data: { auction_item: any[]; error?: any[] } = { auction_item: [] };

    try {
      do {
        const fetchUrl: string = nextCursor ? `${urlString}&cursor=${nextCursor}` : urlString;
        const res = await fetch(fetchUrl, { headers });
        const resData = await res.json();

        if (resData.error) {
          return NextResponse.json(resData);
        }

        if (detailCategory !== "null") {
          const matchCategoryData = resData.auction_item.filter(
            (item: any) => item.auction_item_category === detailCategory,
          );

          data.auction_item.push(...matchCategoryData);
        } else {
          data.auction_item.push(...resData.auction_item);
        }

        nextCursor = resData.next_cursor;
      } while (nextCursor);

      data.auction_item.sort((a, b) => a.auction_price_per_unit - b.auction_price_per_unit);

      return NextResponse.json(data);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  } else {
    return NextResponse.json({ data: [] });
  }
}
