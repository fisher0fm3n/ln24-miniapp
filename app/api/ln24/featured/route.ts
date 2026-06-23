import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch } from "@/lib/ln24";

export async function GET() {
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.featured);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch featured posts" },
      { status: 502 },
    );
  }
}
