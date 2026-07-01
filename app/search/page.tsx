"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import PostRow from "@/components/PostRow";
import { decodeHtml, resolveImageSrc } from "@/lib/ln24";
import type { PostItem, RawListItem } from "@/lib/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const [results, setResults] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async (term: string) => {
    if (!term) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/ln24/search?q=${encodeURIComponent(term)}`);
      const json = await res.json();
      const rows: PostItem[] = (json?.data || []).map((x: RawListItem) => ({
        post_id: x.post_id,
        title: decodeHtml(String(x.title || "")),
        image: resolveImageSrc(x.image_link, x.image),
        image_link: resolveImageSrc(x.image_link, x.image),
        link: String(x.link || ""),
        date: String(x.date || ""),
        excerpt: x.excerpt,
      }));
      setResults(rows);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch results on query change
    runSearch(q);
  }, [q, runSearch]);

  return (
    <main className="max-w-2xl mx-auto py-2">
      <SearchBar initial={q} />
      <div className="px-4 mb-2 mt-1">
        <h1 className="text-xl font-extrabold text-foreground">
          {q ? `Results for “${q}”` : "Search"}
        </h1>
        {q && !loading && (
          <p className="text-sm text-muted mt-1">
            {results.length} {results.length === 1 ? "result" : "results"}
          </p>
        )}
      </div>

      {loading ? (
        <p className="px-4 text-muted">Searching…</p>
      ) : !q ? (
        <p className="px-4 text-muted">Type a term above to search LN24 news.</p>
      ) : results.length === 0 ? (
        <p className="px-4 text-muted">No results found.</p>
      ) : (
        results.map((item) => (
          <PostRow
            key={item.post_id}
            post_id={item.post_id}
            title={item.title}
            image={item.image}
            excerpt={item.excerpt}
            date={item.date}
          />
        ))
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="px-4 py-6 text-muted">Loading…</p>}>
      <SearchResults />
    </Suspense>
  );
}
