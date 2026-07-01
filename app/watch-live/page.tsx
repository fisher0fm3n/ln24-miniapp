"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import LivePlayer from "@/components/LivePlayer";
import FeaturedSlider from "@/components/FeaturedSlider";
import { VideoSkeleton, FeaturedSkeleton } from "@/components/Skeletons";
import { decodeHtml, pickStream, resolveImageSrc } from "@/lib/ln24";
import type { FeaturedItem, RawListItem } from "@/lib/types";

export default function WatchLivePage() {
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [loadingLive, setLoadingLive] = useState(true);
  const [featured, setFeatured] = useState<FeaturedItem[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/ln24/live");
        const json = await res.json();
        if (alive) setStreamUrl(pickStream(json?.data || []));
      } catch {
        // noop
      } finally {
        if (alive) setLoadingLive(false);
      }
    })();
    (async () => {
      try {
        const res = await fetch("/api/ln24/featured");
        const json = await res.json();
        const rows: FeaturedItem[] = (json?.data || []).map((x: RawListItem) => ({
          post_id: x.post_id,
          title: decodeHtml(String(x.title || "")),
          image: resolveImageSrc(x.image_link, x.image),
          image_link: resolveImageSrc(x.image_link, x.image),
          excerpt: x.excerpt,
          link: String(x.link || ""),
        }));
        if (alive) setFeatured(rows);
      } catch {
        // noop
      } finally {
        if (alive) setLoadingFeatured(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      <div className="flex items-center gap-2 px-4 pt-1 pb-3">
        <span className="text-[10px] font-bold text-white bg-primary rounded px-1.5 py-0.5">
          LIVE
        </span>
        <h1 className="text-2xl font-extrabold text-foreground">Watch Live</h1>
      </div>

      {streamUrl ? (
        <LivePlayer streamUrl={streamUrl} />
      ) : loadingLive ? (
        <VideoSkeleton />
      ) : (
        <div className="w-full aspect-video bg-black flex items-center justify-center text-white/80">
          Connecting to live stream…
        </div>
      )}

      <h2 className="px-4 pt-5 pb-1 text-lg font-extrabold text-foreground">
        Featured stories
      </h2>
      {loadingFeatured ? (
        <FeaturedSkeleton />
      ) : (
        <FeaturedSlider items={featured.slice(0, 5)} />
      )}
    </div>
  );
}
