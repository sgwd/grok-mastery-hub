# Reusable Chapter Reading Experience

## Goal
Turn `/chapters/$id` into a calm, premium long-form chapter template that matches the existing Grok Mastery design and can later accept structured or Markdown content.

## What I’ll build
- A dynamic chapter header using the existing course data, with a back-to-course link and chapter label, title, and description.
- A responsive reading layout: sticky “On this page” navigation on desktop and a collapsible contents panel on mobile.
- Realistic Chapter 1 content covering Grok and the agentic loop, including headings, lists, a blockquote, inline code, and polished code examples.
- Reusable content-section and code-block components, including accessible copy controls and success feedback.
- Scroll-aware section highlighting, smooth anchor navigation, restrained entrance motion, and reduced-motion support.
- Previous/next chapter navigation generated from the course sequence, with safe handling for unknown chapter IDs.

## Technical details
- Keep the existing TanStack dynamic route ID `/chapters/$id` and derive chapter metadata from `course-data.ts`.
- Represent chapter content as structured data so Markdown-backed content can replace it later without redesigning the page.
- Use existing semantic color tokens, shared Button components, Lucide icons, and Framer Motion.
- Add dynamic route metadata for valid chapters and a generic unavailable state for unknown IDs.
- Verify Chapter 1 on desktop and mobile, including contents navigation, code copying, and previous/next links.
