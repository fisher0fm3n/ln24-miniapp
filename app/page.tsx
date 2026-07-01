"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryTabs from "@/components/CategoryTabs";
import ArticleCard from "@/components/ArticleCard";
import { PostsSkeleton } from "@/components/Skeletons";
import { decodeHtml, resolveImageSrc } from "@/lib/ln24";
import { getInterests } from "@/lib/storage";
import type { Category, PostItem, RawListItem } from "@/lib/types";

type ApiList = { data?: RawListItem[] };

function mapPosts(json: ApiList): PostItem[] {
  return (json?.data || []).map((x) => ({
    post_id: x.post_id,
    title: decodeHtml(String(x.title || "")),
    image: resolveImageSrc(x.image_link, x.image),
    image_link: resolveImageSrc(x.image_link, x.image),
    link: String(x.link || ""),
    date: String(x.date || ""),
    excerpt: x.excerpt,
  }));
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Load categories (ordered by saved interests first), then pick the first tab.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/ln24/categories");
        const json: { data?: Category[] } = await res.json();
        let cats: Category[] = json?.data || [];
        const interests = getInterests();
        if (interests.length) {
          cats = [...cats].sort((a, b) => {
            const ai = interests.includes(a.category_id) ? 0 : 1;
            const bi = interests.includes(b.category_id) ? 0 : 1;
            return ai - bi;
          });
        }
        if (!alive) return;
        setCategories(cats);
        setActiveId(cats[0]?.category_id ?? null);
      } catch {
        // noop
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Load posts whenever the active category changes. Browser HTTP caching
  // (Cache-Control from the API route) keeps repeat tab views fast, and
  // failed requests are never cached, so a tab always recovers on the next tap.
  useEffect(() => {
    if (activeId == null) return;
    let alive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- show loading during fetch
    setLoadingPosts(true);
    (async () => {
      try {
        const res = await fetch(`/api/ln24/posts?category=${activeId}`);
        const json: ApiList = await res.json();
        if (alive) setPosts(mapPosts(json));
      } catch {
        // noop
      } finally {
        if (alive) setLoadingPosts(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [activeId]);

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      {categories.length > 0 && (
        <CategoryTabs
          categories={categories}
          activeId={activeId}
          onSelect={setActiveId}
        />
      )}

      {loadingPosts ? (
        <PostsSkeleton />
      ) : posts.length === 0 ? (
        <p className="px-4 py-10 text-muted">No stories in this category yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((item) => (
            <ArticleCard
              key={item.post_id}
              post_id={item.post_id}
              title={item.title}
              image={item.image}
              excerpt={item.excerpt}
              date={item.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
