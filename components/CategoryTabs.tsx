"use client";

import type { Category } from "@/lib/types";

export default function CategoryTabs({
  categories,
  activeId,
  onSelect,
}: {
  categories: Category[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="border-b border-border">
      <div className="flex gap-6 px-4 overflow-x-auto scrollbar-none">
        {categories.map((c) => {
          const active = c.category_id === activeId;
          return (
            <button
              key={c.category_id}
              onClick={() => onSelect(c.category_id)}
              className={`relative shrink-0 py-3 text-lg font-bold whitespace-nowrap ${
                active ? "text-primary" : "text-foreground/80"
              }`}
            >
              {c.name}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
