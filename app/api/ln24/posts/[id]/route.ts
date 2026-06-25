import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch, cacheHeaders } from "@/lib/ln24";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/ln24/posts/[id]">,
) {
  const { id } = await ctx.params;
  try {
    const data = await ln24Fetch(LN24_ENDPOINTS.post(id), 300);
    return NextResponse.json(data, { headers: cacheHeaders(300, 1800) });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch post" },
      { status: 502 },
    );
  }
}
