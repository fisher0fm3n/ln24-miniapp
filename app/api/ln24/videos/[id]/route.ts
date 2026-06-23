import { NextResponse } from "next/server";
import { LN24_ENDPOINTS, ln24Fetch } from "@/lib/ln24";
import type { VideoCategory, VideoItem } from "@/lib/types";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/ln24/videos/[id]">,
) {
  const { id } = await ctx.params;
  try {
    const json = await ln24Fetch(LN24_ENDPOINTS.videos);
    const groups: VideoCategory[] = json?.data || [];

    let found: VideoItem | null = null;
    let categoryName = "";
    let related: VideoItem[] = [];

    for (const group of groups) {
      const match = group.videos?.find((v) => String(v.video_id) === id);
      if (match) {
        found = match;
        categoryName = group.name;
        related = group.videos.filter((v) => String(v.video_id) !== id);
        break;
      }
    }

    if (!found) {
      return NextResponse.json(
        { status: false, message: "Video not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: true,
      data: { ...found, categoryName, related },
    });
  } catch {
    return NextResponse.json(
      { status: false, message: "Failed to fetch video" },
      { status: 502 },
    );
  }
}
