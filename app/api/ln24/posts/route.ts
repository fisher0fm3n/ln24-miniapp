import { NextRequest, NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch } from "@/lib/ln24";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "791";
  const page = searchParams.get("page") || "1";
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.posts(category, page));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch posts" },
      { status: 502 },
    );
  }
}
