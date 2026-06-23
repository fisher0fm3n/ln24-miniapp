"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeHtml } from "@/lib/ln24";
import type { VideoItem } from "@/lib/types";

type VideoDetail = VideoItem & {
  categoryName?: string;
  related?: VideoItem[];
};

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset state for new video id
    setLoading(true);
    setErr(false);
    (async () => {
      try {
        const res = await fetch(`/api/ln24/videos/${id}`);
        const json = await res.json();
        if (json?.status && json?.data) {
          if (alive) setVideo(json.data);
        } else if (alive) {
          setErr(true);
        }
      } catch {
        if (alive) setErr(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur px-2 pt-[env(safe-area-inset-top)] h-14 box-content flex items-center border-b border-border">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="h-10 px-2 flex items-center text-foreground"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="w-full aspect-video bg-card animate-pulse" />
      ) : err || !video ? (
        <div className="flex flex-col items-center justify-center px-5 py-20 gap-3">
          <p className="font-bold text-foreground">We couldn’t load this video.</p>
          <Link
            href="/videos"
            className="bg-primary text-white font-bold rounded-lg px-4 h-11 flex items-center"
          >
            Back to Videos
          </Link>
        </div>
      ) : (
        <>
          <video
            src={video.url}
            poster={video.thumbnail}
            controls
            autoPlay
            playsInline
            className="w-full aspect-video bg-black"
          />

          <div className="px-4 py-4">
            {!!video.categoryName && (
              <span className="inline-block text-xs font-semibold text-primary mb-2">
                {video.categoryName}
              </span>
            )}
            <h1 className="text-xl font-extrabold text-foreground">
              {video.title}
            </h1>
            {!!video.description && (
              <p className="mt-3 text-base text-muted whitespace-pre-line">
                {decodeHtml(video.description)}
              </p>
            )}
          </div>

          {!!video.related?.length && (
            <section className="mt-2 pb-6">
              <h2 className="px-4 text-lg font-extrabold text-foreground mb-2.5">
                More like this
              </h2>
              <div className="flex flex-col">
                {video.related.map((v) => (
                  <Link
                    key={v.video_id}
                    href={`/video/${v.video_id}`}
                    className="flex gap-3 px-4 py-2 group"
                  >
                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden bg-card shrink-0">
                      {v.thumbnail && (
                        <Image
                          src={v.thumbnail}
                          alt={v.title}
                          fill
                          className="object-cover"
                          sizes="160px"
                        />
                      )}
                    </div>
                    <h3 className="flex-1 text-sm font-bold text-foreground line-clamp-3 group-hover:text-primary">
                      {v.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
