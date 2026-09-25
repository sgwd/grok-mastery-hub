import type { ChapterContent } from "./chapter-types";
import { part1Chapters } from "./chapters-part-1";
import { part2Chapters } from "./chapters-part-2";
import { part3Chapters } from "./chapters-part-3";
import { part4Chapters } from "./chapters-part-4";
import { part5Chapters } from "./chapters-part-5";

export type { ChapterContent, ChapterSection, ContentBlock } from "./chapter-types";

/** Single source of truth for all chapter content. */
export const allChapters: ChapterContent[] = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters,
  ...part5Chapters,
];

export function getChapterContent(id: number | string) {
  return allChapters.find((chapter) => String(chapter.id) === String(id));
}

export function slugifyHeading(heading: string) {
  return heading.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
