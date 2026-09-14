import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/chapters/$id")({
  head: () => ({ meta: [
    { title: "Chapter — Grok Mastery" },
    { name: "description", content: "Read a technical chapter from the Grok Mastery guide." },
    { property: "og:title", content: "Chapter — Grok Mastery" },
    { property: "og:description", content: "Read a technical chapter from the Grok Mastery guide." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ChapterPage,
});

function ChapterPage() {
  const { id } = Route.useParams();
  return <ComingSoon eyebrow={`Chapter ${id}`} title="Chapter workspace" description="This reading workspace is ready for the complete chapter content, code samples, and progress tracking." />;
}