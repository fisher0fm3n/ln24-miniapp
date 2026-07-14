"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import BoldText from "@/components/BoldText";
import { decodeHtml, htmlToParagraphs, resolveImageSrc } from "@/lib/ln24";
import type { ApiPost } from "@/lib/types";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<ApiPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/ln24/posts/${id}`);
      const json = await res.json();
      if (json?.status && json?.data) {
        setPost(json.data);
      } else {
        throw new Error("Failed to load post");
      }
    } catch {
      setErr("We couldn’t load this post.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    fetchPost();
  }, [fetchPost]);

  const title = decodeHtml(post?.title || "");
  const paragraphs = htmlToParagraphs(post?.content || post?.excerpt || "");

  const sharePost = useCallback(async () => {
    if (!post) return;
    const link = post.link || (typeof window !== "undefined" ? window.location.href : "");
    if (!link) return;
    const canNativeShare =
      typeof navigator !== "undefined" && typeof navigator.share === "function";
    try {
      if (canNativeShare) {
        await navigator.share({ title, text: title, url: link });
        return;
      }
    } catch {
      // user cancelled the native share sheet — stop here
      return;
    }
    // Fallback: copy the link and show confirmation
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = link;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [post, title]);

  return (
    <div className="flex flex-col flex-1 bg-background min-h-screen">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur px-2 pt-[env(safe-area-inset-top)] h-14 box-content flex items-center justify-between border-b border-border">
        <button
          onClick={() => router.back()}
          className="h-10 px-2 flex items-center gap-1 rounded-lg"
          aria-label="Back"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {copied && (
            <span className="text-xs font-semibold text-muted">
              Link copied
            </span>
          )}
          <button
            onClick={sharePost}
            className="h-10 w-10 rounded-full flex items-center justify-center"
            aria-label="Share"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {loading && !post ? (
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-muted">
          Loading post…
        </div>
      ) : err ? (
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <p className="font-bold text-foreground">{err}</p>
          <button
            onClick={() => fetchPost()}
            className="mt-3 flex items-center gap-2 bg-primary rounded-lg px-3.5 h-11 text-white font-bold"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-2.64-6.36M21 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Try Again
          </button>
        </div>
      ) : (
        <main className="flex-1 pb-7">
          <div className="relative w-full aspect-video bg-black">
            {(post?.image_link || post?.image) && (
              <Image
                src={resolveImageSrc(post?.image_link, post?.image)}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/55 to-black/95" />
          </div>

          <div className="px-4 mt-3.5">
            <h1 className="text-[22px] leading-7 font-extrabold text-foreground break-words">
              {title}
            </h1>

            <div className="mt-2 flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                {!!post?.author?.image && (
                  <Image
                    src={post.author.image}
                    alt={post.author.name || "Author"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <span className="text-xs text-muted">
                  {post?.author?.name || "LN24"}
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-muted" />
              {!!post?.date && (
                <span className="text-xs text-muted">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              )}
            </div>

            {!!post?.categories?.length && (
              <div className="flex gap-2 overflow-x-auto py-2.5 scrollbar-none">
                {post.categories.map((c) => (
                  <span
                    key={c.category_id}
                    className="px-2.5 h-7 rounded-full border border-border bg-card flex items-center text-xs font-semibold text-foreground whitespace-nowrap"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 mt-1">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-[22px] mb-3 break-words">
                <BoldText text={p} />
              </p>
            ))}
          </div>

          {!!post?.tags?.length && (
            <div className="px-4 mt-2">
              <h2 className="text-sm font-bold text-foreground">Tags</h2>
              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-none">
                {post.tags.map((t) => (
                  <span
                    key={t.tag_id}
                    className="px-2.5 h-[30px] rounded-full border border-border bg-field flex items-center text-xs text-foreground whitespace-nowrap"
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
