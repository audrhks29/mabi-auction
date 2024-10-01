import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;

  if (!token) {
    console.error("No token found in cookies");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const client = await clientPromise;
    const db = client.db("data");
    const user = await db.collection("data").findOne({ user_id: decoded.user_id });

    if (user) {
      await db.collection("data").updateOne(
        { user_id: decoded.user_id },
        {
          $push: { favorites: data },
        },
      );
      return NextResponse.json({ message: "Data added successfully" }, { status: 201 });
    } else {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error during token verification or database query", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
