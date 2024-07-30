import { NextResponse } from "next/server";

import projectList from "@/assets/sample.json";

export async function GET() {
  return NextResponse.json(projectList);
}
