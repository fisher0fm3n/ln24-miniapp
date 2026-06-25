import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch, cacheHeaders } from "@/lib/ln24";

export async function GET() {
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.featured, 300);
    return NextResponse.json(data, { headers: cacheHeaders(300, 600) });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch featured posts" },
      { status: 502 },
    );
  }
}
