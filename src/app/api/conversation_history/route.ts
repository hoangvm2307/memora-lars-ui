// src/app/api/conversation_history/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:5000/conversation_history");
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
