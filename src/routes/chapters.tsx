import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/chapters")({
  head: () => ({ meta: [
    { title: "Chapters — Grok Mastery" },
    { name: "description", content: "Browse 30 deep technical chapters on Grok and agentic engineering." },
    { property: "og:title", content: "Chapters — Grok Mastery" },
    { property: "og:description", content: "Browse 30 deep technical chapters on Grok and agentic engineering." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ComingSoon eyebrow="30 chapters" title="Deep technical chapters" description="Practical concepts, implementation patterns, and production lessons organized for focused study." />,
});