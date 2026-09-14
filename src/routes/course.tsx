import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/course")({
  head: () => ({ meta: [
    { title: "Course — Grok Mastery" },
    { name: "description", content: "Explore the complete Grok Mastery course and technical guide." },
    { property: "og:title", content: "Course — Grok Mastery" },
    { property: "og:description", content: "Explore the complete Grok Mastery course and technical guide." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ComingSoon eyebrow="Course index" title="The complete learning path" description="A structured journey from your first prompt to production-grade autonomous systems." />,
});