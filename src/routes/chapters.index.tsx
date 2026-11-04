import { createFileRoute } from "@tanstack/react-router";
import { ChapterDirectory } from "@/components/site/chapter-directory";

export const Route = createFileRoute("/chapters/")({
  head: () => ({
    meta: [
      { title: "Chapters — Grok Mastery" },
      { name: "description", content: "Browse Grok Mastery's complete chapters, grouped by course part, with the Loop Engineering Supplement and appendices." },
      { property: "og:title", content: "Chapters — Grok Mastery" },
      { property: "og:description", content: "Browse Grok Mastery's complete chapters, grouped by course part, with the Loop Engineering Supplement and appendices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChapterDirectory,
});