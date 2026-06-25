import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch, cacheHeaders } from "@/lib/ln24";

export async function GET() {
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.live, 60);
    return NextResponse.json(data, { headers: cacheHeaders(60, 120) });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch live stream" },
      { status: 502 },
    );
  }
}
