"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <form
      onSubmit={submit}
      className="px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]"
    >
      <div className="flex items-center gap-3 h-12 px-4 rounded-full border border-border bg-background">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-foreground shrink-0"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search ..."
          className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted"
        />
      </div>
    </form>
  );
}
