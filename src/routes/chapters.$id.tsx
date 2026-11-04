import { createFileRoute, notFound } from "@tanstack/react-router";
import { ChapterReader } from "@/components/site/chapter-reader";
import { getChapterContent } from "@/content/chapters";
import { orderedChapters, chapterNumber, chapterLabel, type Chapter } from "@/components/site/course-data";

export const Route = createFileRoute("/chapters/$id")({
  head: ({ params }) => {
    const content = getChapterContent(params.id);
    const title = content ? `${chapterLabel(content.id)}: ${content.title} — Grok Mastery` : "Chapter not found — Grok Mastery";
    const description = content?.subtitle ?? "Return to the Grok Mastery chapter directory to choose a chapter.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { id } = Route.useParams();
  const numericId = Number(id);

  const content = getChapterContent(numericId);
  if (!content) {
    throw notFound();
  }

  const currentIndex = orderedChapters.findIndex((c) => c.id === numericId);

  const previous = currentIndex > 0 ? orderedChapters[currentIndex - 1] : undefined;
  const next = currentIndex < orderedChapters.length - 1 ? orderedChapters[currentIndex + 1] : undefined;

  const chapter: Chapter = {
    id: content.id,
    number: chapterNumber(content.id),
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
