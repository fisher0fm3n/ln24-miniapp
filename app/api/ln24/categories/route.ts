import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch, cacheHeaders } from "@/lib/ln24";

export async function GET() {
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.categories, 3600);
    return NextResponse.json(data, { headers: cacheHeaders(3600, 86400) });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch categories" },
      { status: 502 },
    );
  }
}
