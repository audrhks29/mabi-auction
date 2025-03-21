import { NextResponse } from "next/server";

export async function GET() {
  const urlString = `https://open.api.nexon.com/mabinogi/v1/openquest/quest?category=CHALLENGE_COUNT`;

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const headers: HeadersInit = API_KEY ? { "x-nxopen-api-key": API_KEY } : {};

    const res = await fetch(urlString, {
      headers,
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
}
