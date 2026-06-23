import { NextRequest, NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch } from "@/lib/ln24";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const param = (searchParams.get("q") || searchParams.get("search_param") || "").trim();
  const page = searchParams.get("page") || "1";

  if (!param) {
    return NextResponse.json({ status: true, data: [] });
  }

  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.search(param, page));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to search" },
      { status: 502 },
    );
  }
}
