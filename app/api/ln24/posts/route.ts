import { NextRequest, NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch, cacheHeaders } from "@/lib/ln24";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "791";
  const page = searchParams.get("page") || "1";
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.posts(category, page), 300);
    return NextResponse.json(data, { headers: cacheHeaders(300, 600) });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch posts" },
      { status: 502 },
    );
  }
}
