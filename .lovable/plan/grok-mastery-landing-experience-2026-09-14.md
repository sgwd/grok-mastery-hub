# Grok Mastery Landing Experience

## Goal
Build a dark-first, premium learning platform landing page for the Grok Mastery technical guide, with a reusable visual system and navigation ready for future course content.

## What I’ll build
- A strict zinc, violet, and cyan design system with Inter and JetBrains Mono typography.
- A sticky responsive header with desktop navigation and an accessible mobile menu.
- A high-impact landing page with the requested hero, six technical feature cards, learning-path highlights, and final call to action.
- A restrained footer and polished empty-state pages for Course, Chapters, and Resources so every navigation item works.
- Subtle entrance, hover, and ambient motion with reduced-motion support.

## Technical details
- Keep the project’s TanStack Router foundation and create typed routes for `/course`, `/chapters`, `/chapters/$id`, and `/resources`.
- Use shared shadcn buttons/cards plus Lucide icons and Motion for React.
- Centralize all color, radius, glow, and font values in the Tailwind v4 token system.
- Add route-specific titles and social metadata, then verify desktop and mobile rendering in the browser.
