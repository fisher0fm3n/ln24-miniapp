"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { clearCache } from "@/lib/storage";

function Row({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-5"
    >
      <div>
        <div className="text-xl font-extrabold text-foreground">{title}</div>
        {subtitle && <div className="text-base text-muted mt-1">{subtitle}</div>}
      </div>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground shrink-0">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from DOM class set by no-flash script
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("ln24-theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  const onClearCache = () => {
    clearCache();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar />

      <div className="px-4 pt-4">
        <h2 className="text-sm font-bold tracking-widest text-foreground/70 mt-8 mb-2">
          APP PREFERENCES
        </h2>

        <div className="flex items-center justify-between border-b border-border py-5">
          <div>
            <div className="text-xl font-extrabold text-foreground">
              Appearance
            </div>
            <div className="text-base text-muted mt-1">
              {dark ? "Dark Mode" : "Light Mode"}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={dark}
            aria-label="Toggle dark mode"
            className={`relative h-9 w-16 rounded-full transition-colors ${
              dark ? "bg-primary/70" : "bg-card border border-border"
            }`}
          >
            <span
              className={`absolute top-1 h-7 w-7 rounded-full bg-background shadow flex items-center justify-center transition-all ${
                dark ? "left-8" : "left-1"
              }`}
            >
              {dark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary)">
                  <circle cx="12" cy="12" r="5" />
                  <g stroke="var(--primary)" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </g>
                </svg>
              )}
            </span>
          </button>
        </div>

        <button
          onClick={onClearCache}
          className="w-full flex items-center justify-between py-5 text-left"
        >
          <span className="text-xl font-extrabold text-foreground">
            {cleared ? "Cache cleared" : "Clear cache"}
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
