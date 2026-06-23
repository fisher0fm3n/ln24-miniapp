"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { getInterests, setInterests } from "@/lib/storage";
import type { Category } from "@/lib/types";

export default function InterestsPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/ln24/categories");
        const json = await res.json();
        if (alive) {
          setCategories(json?.data || []);
          setSelected(getInterests());
        }
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

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      setInterests(next);
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      <div className="flex items-center gap-2 px-4 pt-1 pb-1">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="text-foreground"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-2xl font-extrabold text-foreground">
          Choose your interests
        </h1>
      </div>
      <p className="px-4 pb-3 text-base text-muted">
        Selected topics appear first on your Home feed.
      </p>

      {loading ? (
        <div className="flex flex-wrap gap-3 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 w-28 rounded-full bg-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 px-4">
          {categories.map((c) => {
            const on = selected.includes(c.category_id);
            return (
              <button
                key={c.category_id}
                onClick={() => toggle(c.category_id)}
                className={`h-11 px-5 rounded-full border text-base font-semibold transition-colors ${
                  on
                    ? "bg-primary border-primary text-white"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
