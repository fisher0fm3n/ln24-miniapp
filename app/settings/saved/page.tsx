"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import PostRow from "@/components/PostRow";
import { getSaved, type SavedStory } from "@/lib/storage";

export default function SavedStoriesPage() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedStory[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read saved list from storage
    setSaved(getSaved());
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />
      <div className="flex items-center gap-2 px-4 pt-1 pb-3">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="text-foreground"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-2xl font-extrabold text-foreground">Saved Stories</h1>
      </div>

      {saved.length === 0 ? (
        <p className="px-4 py-10 text-muted">
          You haven’t saved any stories yet. Tap the bookmark on an article to
          save it here.
        </p>
      ) : (
        saved.map((s) => (
          <PostRow
            key={s.post_id}
            post_id={s.post_id}
            title={s.title}
            image={s.image}
            date={s.date}
          />
        ))
      )}
    </div>
  );
}
