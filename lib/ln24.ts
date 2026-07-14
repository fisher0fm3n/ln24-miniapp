const API_KEY = process.env.LN24_API_KEY || "JGJFFCDGH6994DSEGJ58IKOTY89";
const BASE_URL = "https://ln24.loveworldapis.com/api/v1";

export const LN24_ENDPOINTS = {
  live: `${BASE_URL}/live`,
  featured: `${BASE_URL}/featured?page=1`,
  category791: `${BASE_URL}/posts?page=1&category=791`,
  post: (id: string) => `${BASE_URL}/posts/${id}`,
  posts: (category: string, page = "1") =>
    `${BASE_URL}/posts?page=${encodeURIComponent(page)}&category=${encodeURIComponent(category)}`,
  search: (param: string, page = "1") =>
    `${BASE_URL}/search?search_param=${encodeURIComponent(param)}&page=${encodeURIComponent(page)}`,
  categories: `${BASE_URL}/categories`,
  videos: `${BASE_URL}/videos`,
};

export async function ln24Fetch(url: string, revalidate = 300) {
  const res = await fetch(url, {
    headers: { "X-APP-KEY": API_KEY },
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`LN24 API request failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Browser/CDN cache header so repeated requests (e.g. switching category tabs
 * back and forth) are served instantly instead of round-tripping the API.
 */
export function cacheHeaders(maxAge = 300, swr = 600): Record<string, string> {
  return {
    "Cache-Control": `public, max-age=${maxAge}, stale-while-revalidate=${swr}`,
  };
}

export const decodeHtml = (s: string) =>
  (s || "")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&");

const DEFAULT_IMAGE_LINK =
  "https://res.cloudinary.com/raves-music/image/fetch/w_450/fl_lossy,f_jpg/0";

export function resolveImageSrc(
  imageLink?: string | null,
  fallback?: string | null,
): string {
  const resolvedLink = (imageLink || "").trim();
  const resolvedFallback = (fallback || "").trim();

  if (!resolvedLink || resolvedLink === DEFAULT_IMAGE_LINK) {
    return resolvedFallback;
  }

  return resolvedLink;
}

export function htmlToParagraphs(html: string): string[] {
  if (!html) return [];
  let s = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<strong>(.*?)<\/strong>/gi, (_, g) => `**${g}**`)
    .replace(/<b>(.*?)<\/b>/gi, (_, g) => `**${g}**`)
    .replace(/<em>(.*?)<\/em>/gi, (_, g) => `_${g}_`)
    .replace(/<i>(.*?)<\/i>/gi, (_, g) => `_${g}_`)
    .replace(/<[^>]*>/g, "");
  s = decodeHtml(s);
  return s
    .split(/\n{2,}/)
    .map((x) => x.trim())
    // drop decorative separator lines (e.g. "________" or "----") that
    // render as one unbreakable word and blow out the layout
    .filter((x) => x && !/^[_\-—=*\s]{4,}$/.test(x));
}

export const pickStream = (
  arr: { name: string; url: string }[] | undefined,
): string | null => {
  if (!arr?.length) return null;
  const hd = arr.find((x) => /HD/i.test(x.name));
  return (hd || arr[0])?.url || null;
};
