import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookX } from "lucide-react";
import { ChapterReader } from "@/components/site/chapter-reader";
import { courseParts } from "@/components/site/course-data";
import { Button } from "@/components/ui/button";

const chapters = courseParts.flatMap((part) => part.chapters);

export const Route = createFileRoute("/chapters/$id")({
  head: ({ params }) => {
    const chapter = chapters.find((item) => String(item.id) === params.id);
    const title = chapter
      ? `Chapter ${chapter.number}: ${chapter.id === 1 ? "What Grok Is and How the Agentic Loop Works" : chapter.title} — Grok Mastery`
      : "Chapter unavailable — Grok Mastery";
    const description = chapter?.description ?? "This Grok Mastery chapter is unavailable.";

    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(!chapter ? [{ name: "robots", content: "noindex" }] : []),
    ] };
  },
  component: ChapterPage,
});

function ChapterPage() {
  const { id } = Route.useParams();
  const chapterIndex = chapters.findIndex((item) => String(item.id) === id);
  const chapter = chapters[chapterIndex];

  if (!chapter) {
    return (
      <main className="px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
            <BookX aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Chapter unavailable</h1>
          <p className="mt-3 leading-7 text-muted-foreground">This chapter number is not part of the Grok Mastery course.</p>
          <Button asChild variant="outline" className="mt-7">
            <Link to="/course"><ArrowLeft /> Back to Course</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <ChapterReader
      chapter={chapter}
      previous={chapters[chapterIndex - 1]}
      next={chapters[chapterIndex + 1]}
    />
  );
}