import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [
    { title: "Resources — Grok Mastery" },
    { name: "description", content: "Reference material, templates, and tools for Grok agent engineering." },
    { property: "og:title", content: "Resources — Grok Mastery" },
    { property: "og:description", content: "Reference material, templates, and tools for Grok agent engineering." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <ComingSoon eyebrow="Field kit" title="Engineering resources" description="Reusable templates, checklists, examples, and references to support your work beyond the guide." />,
});