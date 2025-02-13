import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, user_password, user_server, user_race, user_nickname } = body;

  const hashedPassword = await bcrypt.hash(user_password, 10);

  const client = await clientPromise;
  const db = client.db("data");

  const existingUser = await db.collection("data").findOne({ user_id });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 404 });
  } else {
    await db.collection("data").insertOne({
      user_id,
      user_password: hashedPassword,
      user_server,
      user_race,
      user_nickname,
    });
    return NextResponse.json({ message: "User registered successfully" });
  }
}
