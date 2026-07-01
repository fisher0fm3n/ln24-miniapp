"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FeaturedSlider from "@/components/FeaturedSlider";
import ArticleCard from "@/components/ArticleCard";
import { FeaturedSkeleton, PostsSkeleton } from "@/components/Skeletons";
import { decodeHtml, resolveImageSrc } from "@/lib/ln24";
import type { FeaturedItem, RawListItem } from "@/lib/types";

export default function FeaturedPage() {
  const [featured, setFeatured] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
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
      <h1 className="px-4 pt-1 pb-2 text-2xl font-extrabold text-foreground">
        Featured
      </h1>

      {loading ? (
        <>
          <FeaturedSkeleton />
          <PostsSkeleton />
        </>
      ) : (
        <>
          <FeaturedSlider items={featured.slice(0, 5)} />
          <div className="divide-y divide-border mt-2">
            {featured.map((item) => (
              <ArticleCard
                key={item.post_id}
                post_id={item.post_id}
                title={item.title}
                image={item.image}
                excerpt={item.excerpt}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
