"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { resolveImageSrc } from "@/lib/ln24";
import type { FeaturedItem } from "@/lib/types";

const AUTO_MS = 6000;

export default function FeaturedSlider({
  items,
}: {
  items: FeaturedItem[];
}) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - 16, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const next = (index + 1) % items.length;
      setIndex(next);
      scrollToIndex(next);
    }, AUTO_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, items.length, scrollToIndex]);

  if (!items.length) return null;

  return (
    <div className="mt-5 mb-1.5">
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scrollbar-none"
      >
        {items.map((item) => (
          <Link
            key={item.post_id}
            href={`/post/${item.post_id}`}
            className="relative shrink-0 w-[calc(100vw-2rem)] sm:w-[420px] aspect-[16/9.4] rounded-lg overflow-hidden snap-start"
          >
            <Image
              src={resolveImageSrc(item.image_link, item.image)}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/55 to-black/95" />
            <div className="absolute left-3.5 right-3.5 bottom-3.5">
              <h3 className="text-base font-extrabold text-[#F6F7FB] line-clamp-2">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-2.5 gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setIndex(i);
              scrollToIndex(i);
            }}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-[#ff0000]" : "bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
