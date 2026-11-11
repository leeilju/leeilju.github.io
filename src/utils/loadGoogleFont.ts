/**
 * Downloads a Google Fonts font file at build time for satori (OG image generation).
 *
 * Satori needs a complete TTF/OTF/WOFF file. Requesting the Google Fonts CSS with a
 * legacy user agent makes Google serve a single `truetype` file per weight instead of
 * the sliced woff2 files modern browsers get. The site body uses Pretendard via CDN,
 * but OG images are rendered server-side, so they need their own Korean-capable font.
 *
 * Results are cached per process, so each family/weight is downloaded once per build.
 */
/** Font family used for generated OG images. Must include Hangul glyphs. */
export const OG_FONT_FAMILY = "Noto Sans KR";

const cache = new Map<string, Promise<ArrayBuffer>>();

const LEGACY_USER_AGENT =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

export function loadGoogleFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const key = `${family}:${weight}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const promise = (async () => {
    const familyParam = family.trim().replace(/\s+/g, "+");
    const cssUrl = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}`;

    const cssRes = await fetch(cssUrl, {
      headers: { "User-Agent": LEGACY_USER_AGENT },
    });
    if (!cssRes.ok) {
      throw new Error(
        `Failed to load Google Fonts CSS for "${family}" ${weight}: HTTP ${cssRes.status}`
      );
    }

    const css = await cssRes.text();
    const match = css.match(
      /src:\s*url\(([^)]+)\)\s*format\(['"](?:opentype|truetype)['"]\)/
    );
    if (!match) {
      throw new Error(
        `No TTF/OTF source found in Google Fonts CSS for "${family}" ${weight}`
      );
    }

    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) {
      throw new Error(
        `Failed to download font file for "${family}" ${weight}: HTTP ${fontRes.status}`
      );
    }
    return fontRes.arrayBuffer();
  })();

  cache.set(key, promise);
  promise.catch(() => cache.delete(key));
  return promise;
}
