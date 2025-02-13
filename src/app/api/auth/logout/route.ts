import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  try {
    // 로그아웃 시 쿠키 삭제
    const response = NextResponse.json({ message: "Logout successful" });

    // 쿠키의 만료 시간을 과거로 설정하여 쿠키 삭제
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1, // 과거의 시간으로 설정하여 브라우저가 쿠키를 삭제하도록 함
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
