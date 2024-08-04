import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id } = body;

  try {
    const client = await clientPromise;
    const db = client.db("data");
    const user = await db.collection("data").findOne({ user_id: user_id });

    if (user) {
      return NextResponse.json({ error: "이미 존재하는 아이디입니다." });
    } else {
      return NextResponse.json({ message: "가입이 가능한 아이디입니다." });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    (await clientPromise).close;
  }
}
