"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  live?: boolean;
};

const items: Item[] = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
      </svg>
    ),
  },
  {
    href: "/featured",
    label: "Featured",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a3 3 0 100-6 3 3 0 000 6zM9 13c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4zm7 0c-.6 0-1.2.1-1.8.2 1.1.9 1.8 2.1 1.8 3.8v2h6v-2c0-2.5-3-4-6-4z" />
      </svg>
    ),
  },
  {
    href: "/videos",
    label: "Videos",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <path d="M10 8l6 4-6 4z" fill="var(--background)" />
      </svg>
    ),
  },
  {
    href: "/watch-live",
    label: "Watch Live",
    live: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="6" width="14" height="12" rx="2" />
        <path d="M22 8l-4 3.5L22 15z" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "Settings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.4 13a7.8 7.8 0 000-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 00-1.7-1l-.4-2.6h-4l-.4 2.6a7.6 7.6 0 00-1.7 1l-2.4-1-2 3.4L4.6 11a7.8 7.8 0 000 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border">
      <ul className="flex items-stretch justify-between px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 ${
                  active ? "text-primary" : "text-muted"
                }`}
              >
                <span className="relative">
                  {item.icon}
                  {item.live && (
                    <span className="absolute -top-2 -right-4 text-[8px] font-bold leading-none text-white bg-primary rounded px-1 py-0.5">
                      LIVE
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-semibold">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
