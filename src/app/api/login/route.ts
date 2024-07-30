import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.DB_URL!;
const client = new MongoClient(uri);

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { user_id, user_password } = body;

    await client.connect();
    const db = client.db("data");
    const loggedUserData = await db.collection("data").findOne({ user_id: user_id, user_password: user_password });

    if (loggedUserData) {
      return NextResponse.json({ message: "Login successful", userData: loggedUserData });
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
