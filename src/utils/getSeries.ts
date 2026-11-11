import type { CollectionEntry } from "astro:content";
import { BLOG_PATH } from "@/content.config";
import {
  CATEGORIES,
  type CategoryDef,
  type SeriesDef,
} from "@/data/categories";
import { postFilter } from "./postFilter";

type Post = CollectionEntry<"posts">;

/**
 * Returns the series id of a post: the first folder under `src/content/posts/`
 * (folders starting with `_` are skipped, as in getPostPaths). Posts placed
 * directly in the root have no series.
 */
export function getSeriesId(post: Post): string | undefined {
  const segments =
    post.filePath
      ?.replace(BLOG_PATH, "")
      .split("/")
      .filter(segment => segment !== "" && !segment.startsWith("_")) ?? [];
  return segments.length > 1 ? segments[0] : undefined;
}

/** Looks up a series and the category it belongs to in `src/data/categories.ts`. */
export function findSeries(
  seriesId: string | undefined
): { category: CategoryDef; series: SeriesDef } | undefined {
  if (!seriesId) return undefined;
  for (const category of CATEGORIES) {
    const series = category.series.find(s => s.id === seriesId);
    if (series) return { category, series };
  }
  return undefined;
}

/**
 * Posts of one series in reading order. Drafts and scheduled posts are
 * excluded. The order follows the file name (numeric-aware), so the `01-`,
 * `02-`, … prefixes decide it regardless of dates.
 */
export function getSeriesPosts(posts: Post[], seriesId: string): Post[] {
  return posts
    .filter(postFilter)
    .filter(post => getSeriesId(post) === seriesId)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

/** Posts that belong to no registered series. */
export function getUnseriesedPosts(posts: Post[]): Post[] {
  return posts
    .filter(postFilter)
    .filter(post => !findSeries(getSeriesId(post)));
}
