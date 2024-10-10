import { NextRequest, NextResponse } from "next/server";
import hornList from "@/assets/bigHornOfShout.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const inputText = searchParams.get("inputText");

  if (inputText) {
    const filteredList = hornList.filter(item => item.text.includes(inputText));
    return NextResponse.json(filteredList);
  }

  return NextResponse.json(hornList);
}
