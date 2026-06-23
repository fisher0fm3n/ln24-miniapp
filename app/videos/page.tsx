"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import type { VideoCategory } from "@/lib/types";

export default function VideosPage() {
  const [groups, setGroups] = useState<VideoCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/ln24/videos");
        const json = await res.json();
        const data: VideoCategory[] = (json?.data || []).filter(
          (c: VideoCategory) => c.videos?.length,
        );
        if (alive) setGroups(data);
      } catch {
        // noop
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      <main className="py-2">
        <div className="px-4 mb-2">
          <h1 className="text-2xl font-extrabold text-foreground">Videos</h1>
        </div>

        {loading ? (
          <div className="px-4 space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <div className="h-6 w-40 rounded-md bg-card animate-pulse mb-3" />
                <div className="flex gap-3 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-64 shrink-0 aspect-video rounded-lg bg-card animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groups.length === 0 ? (
          <p className="px-4 text-muted">No videos available right now.</p>
        ) : (
          <div className="space-y-7">
            {groups.map((group) => (
              <section key={group.category_id}>
                <h2 className="px-4 text-lg font-extrabold text-foreground mb-2.5">
                  {group.name}
                </h2>
                <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
                  {group.videos.map((v) => (
                    <Link
                      key={v.video_id}
                      href={`/video/${v.video_id}`}
                      className="w-64 shrink-0 text-left group"
                    >
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card">
                        {v.thumbnail && (
                          <Image
                            src={v.thumbnail}
                            alt={v.title}
                            fill
                            className="object-cover"
                            sizes="256px"
                          />
                        )}
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-11 h-11 rounded-full bg-black/55 border border-white/20 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-foreground line-clamp-2 group-hover:text-primary">
                        {v.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
