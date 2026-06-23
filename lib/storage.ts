export type SavedStory = {
  post_id: number;
  title: string;
  image: string;
  date?: string;
};

const K_SAVED = "ln24-saved";
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

/* ---------------- Saved stories ---------------- */
export function getSaved(): SavedStory[] {
  return read<SavedStory[]>(K_SAVED, []);
}

export function isSaved(id: number): boolean {
  return getSaved().some((s) => s.post_id === id);
}

export function toggleSaved(story: SavedStory): boolean {
  const list = getSaved();
  const exists = list.some((s) => s.post_id === story.post_id);
  const next = exists
    ? list.filter((s) => s.post_id !== story.post_id)
    : [story, ...list];
  write(K_SAVED, next);
  return !exists;
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
