import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { user_id, user_password, server, race, nickname, skill_data } = body;

  const client = await clientPromise;
  const db = client.db("data");

  const existingUser = await db.collection("data").findOne({ user_id });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 404 });
  } else {
    await db.collection("data").insertOne({
      user_id,
      user_password,
      server,
      race,
      nickname,
      skill_data,
    });
    return NextResponse.json({ message: "User registered successfully" });
  }
}
