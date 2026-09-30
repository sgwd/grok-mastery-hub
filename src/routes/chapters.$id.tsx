import { createFileRoute, notFound } from "@tanstack/react-router";
import { ChapterReader } from "@/components/site/chapter-reader";
import { allChapters, getChapterContent } from "@/content/chapters";
import type { Chapter } from "@/components/site/course-data";

export const Route = createFileRoute("/chapters/$id")({
  component: ChapterPage,
});

function ChapterPage() {
  const { id } = Route.useParams();
  const numericId = Number(id);

  const content = getChapterContent(numericId);
  if (!content) {
    throw notFound();
  }

  // Build a flat ordered list of all chapters (including Part 6 + Appendices)
  const orderedChapters: Chapter[] = allChapters.map((c) => ({
    id: c.id,
    number: String(c.id).padStart(2, "0"),
    title: c.title,
    description: c.subtitle,
  }));

  const currentIndex = orderedChapters.findIndex((c) => c.id === numericId);

  const previous = currentIndex > 0 ? orderedChapters[currentIndex - 1] : undefined;
  const next = currentIndex < orderedChapters.length - 1 ? orderedChapters[currentIndex + 1] : undefined;

  const chapter: Chapter = {
    id: content.id,
    number: String(content.id).padStart(2, "0"),
    title: content.title,
    description: content.subtitle,
  };

  return (
    <ChapterReader
      chapter={chapter}
      content={content}
      previous={previous}
      next={next}
    />
  );
}
