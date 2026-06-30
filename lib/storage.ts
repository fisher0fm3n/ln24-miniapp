const K_INTERESTS = "ln24-interests";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

/* ---------------- Interests ---------------- */
export function getInterests(): number[] {
  return read<number[]>(K_INTERESTS, []);
}

export function setInterests(ids: number[]) {
  write(K_INTERESTS, ids);
}

/* ---------------- Cache ---------------- */
export function clearCache() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith("ln24-cache"))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
