type Entry = { t: number; data: unknown };

const store = new Map<string, Entry>();
const DEFAULT_TTL = 5 * 60 * 1000;

/** Synchronous read — returns cached data if still fresh, else undefined. */
export function peek<T>(url: string, ttl = DEFAULT_TTL): T | undefined {
  const hit = store.get(url);
  if (hit && Date.now() - hit.t < ttl) return hit.data as T;
  return undefined;
}

/** Fetch JSON with an in-memory cache so repeat views don't refetch. */
export async function fetchJson<T>(url: string, ttl = DEFAULT_TTL): Promise<T> {
  const cached = peek<T>(url, ttl);
  if (cached !== undefined) return cached;
  const res = await fetch(url);
  const data = (await res.json()) as T;
  store.set(url, { t: Date.now(), data });
  return data;
}
