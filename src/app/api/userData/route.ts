import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  return NextResponse.json({ s: "Test" });
}
