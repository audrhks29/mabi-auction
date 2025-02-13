import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.ACCESS_SECRET_KEY!;
  try {
    const body = await req.json();
    const { user_id, user_password } = body;

    const token = jwt.sign({ user_id: user_id }, SECRET_KEY, { expiresIn: "1h" });

    const client = await clientPromise;
    const db = client.db("data");
    const loggedUserData = await db.collection("data").findOne({ user_id: user_id });

    const checkedPassword = await bcrypt.compare(user_password, loggedUserData?.user_password);

    if (loggedUserData && checkedPassword) {
      const response = NextResponse.json({ message: "Login successful", userData: loggedUserData });

      response.cookies.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
        sameSite: "strict",
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
