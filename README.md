# Grok Mastery Platform

Build a premium, dark-mode-first documentation and online course website called "Grok Mastery" – a beautiful, modern knowledge platform for the technical book "Grok Mastery Guide: From Your First Prompt to Autonomous Multi-Agent Engineering".

### Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- Framer Motion for subtle animations
- React Router for navigation

### Design System (strictly follow this)

**Color Palette (Dark mode default):**
- Background: #09090B (zinc-950)
- Surface / Cards: #18181B (zinc-900)
- Elevated surface: #27272A
- Border: #3F3F46
- Primary accent: #8B5CF6 (violet-500) with hover #A78BFA
- Secondary accent: #22D3EE (cyan-400)
- Text primary: #FAFAFA
- Text secondary: #A1A1AA
- Text muted: #71717A

**Typography:**
- Headings: Inter (or Geist), font-semibold to font-bold, tight tracking
- Body: Inter, excellent readability
- Code: JetBrains Mono

**Style characteristics:**
- Extremely clean and spacious
- Subtle glassmorphism on cards (backdrop-blur + very light border)
- Soft glowing accents on primary buttons and important hover states
- Perfect border radius (rounded-xl and rounded-2xl)
- Generous whitespace
- High-end, minimal, modern aesthetic similar to Linear + Vercel + Arc

### Overall App Structure
Create a clean app shell with:
- Sticky top navigation
- Mobile-responsive hamburger menu
- Dark mode only for now (we can add light mode later)
- Footer

Navigation items:
- Home
- Course (Table of Contents)
- Chapters
- Resources

### Landing Page (Home) – Make this exceptional

Create a stunning landing page with these sections:

1. **Hero Section**
   - Large, bold headline: "Grok Mastery"
   - Subheadline: "From Your First Prompt to Autonomous Multi-Agent Engineering"
   - Short supporting text explaining that this is a complete professional technical guide for building production-grade agentic systems with Grok (xAI)
   - Two buttons: “Start Learning” (primary) and “View Table of Contents” (secondary/outline)
   - Subtle background gradient or very soft grid/glow effect
   - Elegant animated entrance

2. **Value Proposition / Features**
   - 4–6 feature cards in a clean grid
   - Examples: 30 Deep Technical Chapters, Multi-Agent Systems, Production Patterns, Tool Calling & Security, Evaluation & Observability, Autonomous Loops
   - Each card should have an icon, title, and short description
   - Soft hover elevation effect

3. **Course Highlights**
   - Section showing that the guide covers Foundations → Core Skills → Extending Grok → Shipping Software → Mastery & Enterprise Patterns + Loop Engineering Supplement
   - Use elegant horizontal or grid layout

4. **Call to Action**
   - Strong final CTA section encouraging users to begin the journey

5. **Footer**
   - Simple, elegant footer with copyright and navigation links

### Additional Requirements
- Fully responsive (mobile-first)
- Excellent accessibility
- Smooth scroll and subtle Framer Motion animations (fade-in, slight slide-up)
- All components should feel premium and tightly designed
- Use shadcn/ui for buttons, cards, navigation, etc.
- Prepare the routing structure so we can easily add:
  - /course (Table of Contents page)
  - /chapters/:id (individual chapter pages)
  - /resources

First, implement the complete design system, app layout, navigation, and the full Landing Page. Make the visual quality as high as possible.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://grok-mastery-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6fa6db3a-5a75-4ac4-8e32-b3a23ba4e6ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
